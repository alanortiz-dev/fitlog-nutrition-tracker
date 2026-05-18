import { demoEntries, demoProfile, mockFoods } from '@/data/mockData';
import { DiaryEntry, Food, UserProfile } from '@/types';

export type PersistedMode = 'standard' | 'demo';

interface PersistedSession {
  isAuthenticated: boolean;
  mode: PersistedMode;
}

interface PersistedUserState {
  user: UserProfile | null;
  entries: DiaryEntry[];
  customFoods: Food[];
}

export interface PersistedAppState {
  isAuthenticated: boolean;
  isDemo: boolean;
  user: UserProfile | null;
  entries: DiaryEntry[];
  customFoods: Food[];
  allFoods: Food[];
}

const STORAGE_VERSION = 1;
const STORAGE_KEY = 'fitlog.app.v1';

interface StoragePayload {
  version: number;
  session: PersistedSession;
  standard: PersistedUserState;
  demo: PersistedUserState;
}

function createEmptyUserState(): PersistedUserState {
  return {
    user: null,
    entries: [],
    customFoods: [],
  };
}

function createDefaultPayload(): StoragePayload {
  return {
    version: STORAGE_VERSION,
    session: {
      isAuthenticated: false,
      mode: 'standard',
    },
    standard: createEmptyUserState(),
    demo: {
      user: demoProfile,
      entries: demoEntries,
      customFoods: [],
    },
  };
}

function isBrowserStorageAvailable() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function sanitizeUserState(value: Partial<PersistedUserState> | undefined): PersistedUserState {
  return {
    user: value?.user ?? null,
    entries: Array.isArray(value?.entries) ? value.entries : [],
    customFoods: Array.isArray(value?.customFoods) ? value.customFoods : [],
  };
}

function sanitizePayload(value: unknown): StoragePayload {
  const fallback = createDefaultPayload();

  if (!value || typeof value !== 'object') {
    return fallback;
  }

  const payload = value as Partial<StoragePayload>;
  const mode = payload.session?.mode === 'demo' ? 'demo' : 'standard';

  return {
    version: STORAGE_VERSION,
    session: {
      isAuthenticated: Boolean(payload.session?.isAuthenticated),
      mode,
    },
    standard: sanitizeUserState(payload.standard),
    demo: sanitizeUserState(payload.demo?.user ? payload.demo : fallback.demo),
  };
}

function buildAppState(payload: StoragePayload): PersistedAppState {
  const current = payload.session.mode === 'demo' ? payload.demo : payload.standard;
  const customFoods = current.customFoods;

  return {
    isAuthenticated: payload.session.isAuthenticated,
    isDemo: payload.session.mode === 'demo',
    user: current.user,
    entries: current.entries,
    customFoods,
    allFoods: [...mockFoods, ...customFoods],
  };
}

function readPayload(): StoragePayload {
  if (!isBrowserStorageAvailable()) {
    return createDefaultPayload();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDefaultPayload();
    }

    return sanitizePayload(JSON.parse(raw));
  } catch {
    return createDefaultPayload();
  }
}

function writePayload(payload: StoragePayload) {
  if (!isBrowserStorageAvailable()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadAppState(): PersistedAppState {
  return buildAppState(readPayload());
}

export function persistStandardSession() {
  const payload = readPayload();
  payload.session = { isAuthenticated: true, mode: 'standard' };
  writePayload(payload);
}

export function persistDemoSession() {
  const payload = readPayload();
  payload.session = { isAuthenticated: true, mode: 'demo' };
  writePayload(payload);
}

export function clearSession() {
  const payload = readPayload();
  payload.session = { isAuthenticated: false, mode: 'standard' };
  writePayload(payload);
}

export function updateCurrentModeState(updater: (state: PersistedUserState) => PersistedUserState): PersistedAppState {
  const payload = readPayload();
  const key = payload.session.mode === 'demo' ? 'demo' : 'standard';
  payload[key] = updater(payload[key]);
  writePayload(payload);
  return buildAppState(payload);
}
