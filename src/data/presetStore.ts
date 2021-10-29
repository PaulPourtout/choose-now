import AsyncStorage from '@react-native-async-storage/async-storage';
import uuidv4 from 'uuidv4';

export interface Preset {
  uuid?: string;
  label: string;
  data: string[];
}

const PRESETS: Preset[] = [
  {
    label: 'Yes/No',
    data: ['No', 'Yes'],
  },
  {
    label: 'Restaurant',
    data: ['Italian', 'Bobun', 'Chinese', 'Burger', 'Jap'],
  },
  {
    label: 'Activities',
    data: ['Cinema', 'Walk', 'Art expo', 'Drink'],
  },
  {
    label: 'Music',
    data: ['Rock', 'Blues', 'Rap', 'Pop'],
  },
  {
    label: "Who's the boss ?",
    data: ['You'],
  },
];

class PresetStore {
  presetStore: PresetStore | undefined;
  prefix = "@preset";
  separator = "_";

  constructor() {
    this.initialize();
  }

  private async initialize() {
    console.log('INIT Preset Store');
    const existingPresets = await this.getAllPresets();

    if (!existingPresets || existingPresets.length === 0) {
      try {
        for await (let preset of PRESETS) {
          await this.savePreset(preset);
        }
      } catch (error) {
        console.log("ERROR CREATING PRESETS", error);
      }
    }
  }

  public async savePreset(presetData: Preset): Promise<Preset | null> {
    const uuid = uuidv4();
    const presetId = `${this.prefix}${this.separator}${uuid}`;
    console.log('SAVING PRESET');

    const preset = {
      uuid: presetId,
      ...presetData,
    };

    try {
      await AsyncStorage.setItem(presetId, JSON.stringify(preset));
      return preset;
      console.log('DID SAVE PRESET');
    } catch (error) {
      console.error('Preset not saved', error);
      return null;
    }
  }

  public async getPreset(presetId: string): Promise<Preset | null> {
    try {
      const item = await AsyncStorage.getItem(presetId);

      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error while getting Preset ${presetId}::`, error);
      return null;
    }
  }

  public async getAllPresets(): Promise<Preset[] | null> {
    try {
      const keys: string[] = await AsyncStorage.getAllKeys();
      console.log("KEYS", keys);

      const presets = [];

      for await (let key of keys) {
        const prefix = key.split(this.separator)[0];
        if (prefix === this.prefix) {
          const preset = await this.getPreset(key);
          !!preset && presets.push(preset);
        }
      }

      return presets;
    } catch (error) {
      console.error('Error while getting all presets', error);
      return null;
    }
  }

  public async clearPresets() {
    try {
      const keys: string[] = await AsyncStorage.getAllKeys();

      for await (let key of keys) {
        const prefix = key.split(this.separator)[0];
        if (prefix === this.prefix) {
          await AsyncStorage.removeItem(key);
        }
      }

      // Generate app's presets
      await this.initialize();
    } catch (error) {
      console.log('Error while clearing presets', error);
    }
  }
}

export const presetStore = new PresetStore();
