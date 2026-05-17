export interface PredictionFormData {
  sowingDate: string;
  nitrogenApplied: number;
  phosphorusApplied: number;
  soilPh: number;
  averageTemperature: number;
  averageRainfall: number;
  averageHumidity: number;
  plantDensity: number;
  seedType: 'Hybrid' | 'Local' | 'Improved';
}

export interface PredictionResult {
  predictedYield: number;
}

export interface FormErrors {
  [key: string]: string;
}