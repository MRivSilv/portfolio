import { Injectable, signal } from '@angular/core';
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  type QuerySnapshot,
  type DocumentData,
  type Firestore,
  type Unsubscribe
} from 'firebase/firestore';
import { environment } from '../../../environments/environment';
import {
  DEFAULT_PORTFOLIO_CONTENT,
  type Metric,
  type PortfolioContent,
  type Project,
  type Profile,
  type Skill,
  type SocialLink,
  type Step
} from './portfolio-content.model';

@Injectable({ providedIn: 'root' })
export class PortfolioContentService {
  readonly content = signal<PortfolioContent>(DEFAULT_PORTFOLIO_CONTENT);
  readonly loading = signal(false);
  readonly firebaseReady = signal(false);
  readonly error = signal<string | null>(null);

  private initialized = false;
  private app: FirebaseApp | null = null;
  private firestore: Firestore | null = null;
  private unsubscribeFns: Unsubscribe[] = [];
  private currentContent = { ...DEFAULT_PORTFOLIO_CONTENT };
  private readiness = {
    brand: false,
    profile: false,
    metrics: false,
    skills: false,
    projects: false,
    steps: false,
    links: false
  };

  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    if (!this.hasFirebaseConfig()) {
      this.firebaseReady.set(false);
      return;
    }

    const firestore = this.getFirestore();
    if (!firestore) {
      this.firebaseReady.set(false);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      this.setupRealtimeListeners(firestore);
      this.firebaseReady.set(true);
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'No se pudo cargar Firebase.');
      this.firebaseReady.set(false);
      this.loading.set(false);
      this.content.set(DEFAULT_PORTFOLIO_CONTENT);
    }
  }

  private hasFirebaseConfig(): boolean {
    const firebase = environment.firebase;

    return Boolean(firebase?.apiKey && firebase.projectId && firebase.appId);
  }

  private getFirestore(): Firestore | null {
    if (!this.hasFirebaseConfig()) {
      return null;
    }

    if (!this.firestore) {
      this.app = getApps().length ? getApp() : initializeApp(environment.firebase!);
      this.firestore = getFirestore(this.app);
    }

    return this.firestore;
  }

  private setupRealtimeListeners(firestore: Firestore): void {
    this.unsubscribeFns.forEach((unsubscribe) => unsubscribe());
    this.unsubscribeFns = [];

    this.currentContent = { ...DEFAULT_PORTFOLIO_CONTENT };
    this.readiness = {
      brand: false,
      profile: false,
      metrics: false,
      skills: false,
      projects: false,
      steps: false,
      links: false
    };

    this.unsubscribeFns.push(
      onSnapshot(
        doc(firestore, 'site', 'config'),
        (snapshot) => {
          this.currentContent.brand = snapshot.exists()
            ? this.readString(snapshot.data(), 'brand', DEFAULT_PORTFOLIO_CONTENT.brand)
            : DEFAULT_PORTFOLIO_CONTENT.brand;
          this.readiness.brand = true;
          this.commitContent();
        },
        (error) => this.reportError(error)
      )
    );

    this.unsubscribeFns.push(
      onSnapshot(
        doc(firestore, 'profile', 'main'),
        (snapshot) => {
          this.currentContent.profile = snapshot.exists()
            ? {
                name: this.readString(snapshot.data(), 'name', DEFAULT_PORTFOLIO_CONTENT.profile.name),
                role: this.readString(snapshot.data(), 'role', DEFAULT_PORTFOLIO_CONTENT.profile.role),
                headline: this.readString(
                  snapshot.data(),
                  'headline',
                  DEFAULT_PORTFOLIO_CONTENT.profile.headline
                ),
                bio: this.readString(snapshot.data(), 'bio', DEFAULT_PORTFOLIO_CONTENT.profile.bio),
                availability: this.readString(
                  snapshot.data(),
                  'availability',
                  DEFAULT_PORTFOLIO_CONTENT.profile.availability
                ),
                location: this.readString(
                  snapshot.data(),
                  'location',
                  DEFAULT_PORTFOLIO_CONTENT.profile.location
                ),
                email: this.readString(snapshot.data(), 'email', DEFAULT_PORTFOLIO_CONTENT.profile.email)
              }
            : DEFAULT_PORTFOLIO_CONTENT.profile;
          this.readiness.profile = true;
          this.commitContent();
        },
        (error) => this.reportError(error)
      )
    );

    this.subscribeCollection<Metric>(
      firestore,
      'metrics',
      (data) => ({
        value: this.readString(data, 'value', ''),
        label: this.readString(data, 'label', ''),
        detail: this.readString(data, 'detail', ''),
        order: this.readNumber(data, 'order', 0)
      }),
      (items) => {
        this.currentContent.metrics = items.length ? items : DEFAULT_PORTFOLIO_CONTENT.metrics;
        this.readiness.metrics = true;
        this.commitContent();
      }
    );

    this.subscribeCollection<Skill>(
      firestore,
      'skills',
      (data) => ({
        name: this.readString(data, 'name', ''),
        icon: this.readString(data, 'icon', 'terminal'),
        accent: this.readAccent(data, 'accent'),
        category: this.readString(data, 'category', ''),
        level: this.readString(data, 'level', ''),
        order: this.readNumber(data, 'order', 0)
      }),
      (items) => {
        this.currentContent.skills = items.length ? items : DEFAULT_PORTFOLIO_CONTENT.skills;
        this.readiness.skills = true;
        this.commitContent();
      }
    );

    this.subscribeCollection<Project>(
      firestore,
      'projects',
      (data) => ({
        title: this.readString(data, 'title', ''),
        category: this.readString(data, 'category', ''),
        summary: this.readString(data, 'summary', ''),
        tags: this.readStringArray(data, 'tags'),
        year: this.readString(data, 'year', ''),
        featured: this.readBoolean(data, 'featured', false),
        order: this.readNumber(data, 'order', 0)
      }),
      (items) => {
        this.currentContent.projects = items.length ? items : DEFAULT_PORTFOLIO_CONTENT.projects;
        this.readiness.projects = true;
        this.commitContent();
      }
    );

    this.subscribeCollection<Step>(
      firestore,
      'steps',
      (data) => ({
        index: this.readString(data, 'index', ''),
        title: this.readString(data, 'title', ''),
        description: this.readString(data, 'description', ''),
        order: this.readNumber(data, 'order', 0)
      }),
      (items) => {
        this.currentContent.steps = items.length ? items : DEFAULT_PORTFOLIO_CONTENT.steps;
        this.readiness.steps = true;
        this.commitContent();
      }
    );

    this.subscribeCollection<SocialLink>(
      firestore,
      'socialLinks',
      (data) => ({
        label: this.readString(data, 'label', ''),
        url: this.readString(data, 'url', '#contacto'),
        icon: this.readString(data, 'icon', 'link'),
        order: this.readNumber(data, 'order', 0),
        visible: this.readBoolean(data, 'visible', true)
      }),
      (items) => {
        this.currentContent.links = items.length
          ? items.filter((link) => link.visible)
          : DEFAULT_PORTFOLIO_CONTENT.links;
        this.readiness.links = true;
        this.commitContent();
      }
    );
  }

  private subscribeCollection<T extends { order: number }>(
    firestore: Firestore,
    collectionName: string,
    mapper: (data: DocumentData) => T,
    onItems: (items: T[]) => void
  ): void {
    this.unsubscribeFns.push(
      onSnapshot(
        query(collection(firestore, collectionName), orderBy('order')),
        (snapshot: QuerySnapshot<DocumentData>) => {
          const items = snapshot.docs.map((item) => mapper(item.data()));
          onItems(items);
        },
        (error) => this.reportError(error)
      )
    );
  }

  private commitContent(): void {
    this.content.set({
      ...DEFAULT_PORTFOLIO_CONTENT,
      ...this.currentContent
    });

    this.loading.set(!this.hasLoadedAllSources());
  }

  private hasLoadedAllSources(): boolean {
    return Object.values(this.readiness).every(Boolean);
  }

  private reportError(error: unknown): void {
    this.error.set(error instanceof Error ? error.message : 'No se pudo cargar Firebase.');
    this.firebaseReady.set(false);
    this.loading.set(false);
  }

  private readString(data: DocumentData, key: string, fallback: string): string {
    const value = data[key];

    return typeof value === 'string' && value.trim() ? value : fallback;
  }

  private readStringArray(data: DocumentData, key: string): string[] {
    const value = data[key];

    if (!Array.isArray(value)) {
      return [];
    }

    return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  }

  private readNumber(data: DocumentData | Record<string, unknown>, key: string, fallback: number): number {
    const value = data[key];

    return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
  }

  private readBoolean(data: DocumentData, key: string, fallback: boolean): boolean {
    const value = data[key];

    return typeof value === 'boolean' ? value : fallback;
  }

  private readAccent(data: DocumentData, key: string): Skill['accent'] {
    const value = data[key];

    if (value === 'secondary' || value === 'tertiary') {
      return value;
    }

    return 'primary';
  }
}
