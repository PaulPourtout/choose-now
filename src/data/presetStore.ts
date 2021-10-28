import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'uuidv4';

export interface Preset {
  uuid?: string;
  label: string;
  choices: string[];
}

const PRESETS: Preset[] = [
  {
    label: 'Yes/No',
    choices: ['No', 'Yes'],
  },
  {
    label: 'Restaurant',
    choices: ['Italian', 'Bobun', 'Chinese', 'Burger', 'Jap'],
  },
  {
    label: 'Activities',
    choices: ['Cinema', 'Walk', 'Art expo', 'Drink'],
  },
  {
    label: 'Music',
    choices: ['Rock', 'Blues', 'Rap', 'Pop'],
  },
  {
    label: "Who's the boss ?",
    choices: ['You'],
  },
];

class PresetStore {
  presetStore: PresetStore | undefined;
  prefix = "@preset_";

  constructor() {
    this.initialize();
  }

  private async initialize() {
    console.log('INIT Preset Store');
    try {
      for await (let preset of PRESETS) {
        await this.savePreset(preset);
      }
    } catch (error) {
      console.log("ERROR CREATING PRESETS", error);

    }
  }

  public async savePreset(presetData: Preset) {
    const presetId = `${this.prefix}}${uuid()}`;
    console.log('SAVING PRESET');

    const preset = {
      uuid: presetId,
      ...presetData,
    };

    try {
      await AsyncStorage.setItem(presetId, JSON.stringify(preset));
      console.log('DID SAVE PRESET');
    } catch (error) {
      console.error('Preset not saved', error);
    }
  }

  public async getPreset(presetId: string) {
    try {
      return AsyncStorage.getItem(presetId);
    } catch (error) {
      console.error(`Error while getting Preset ${presetId}::`, error);
    }
  }

  public async getAllPresets() {
    try {
      const keys: string[] = await AsyncStorage.getAllKeys();
      const presets = [];

      for await (let key of keys) {
        const prefix = key.split('_')[0];
        if (prefix === this.prefix) {
          const preset = await this.getPreset(key);
          !!preset && presets.push(JSON.parse(preset));
        }
      }

      return presets;
    } catch (error) {
      console.error('Error while getting all presets', error);
    }
  }

  public async clearPresets() {
    try {
      const keys: string[] = await AsyncStorage.getAllKeys();

      for await (let key of keys) {
        const prefix = key.split('_')[0];
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
