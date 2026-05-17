import React, { useState } from 'react';
import { Sprout, Send } from 'lucide-react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import LoadingSpinner from './LoadingSpinner';
import ResultsCard from './ResultsCard';
import { PredictionFormData, PredictionResult, FormErrors } from '../types/prediction';

const PredictionForm: React.FC = () => {
  const [formData, setFormData] = useState<PredictionFormData>({
    sowingDate: '',
    nitrogenApplied: 0,
    phosphorusApplied: 0,
    soilPh: 0,
    averageTemperature: 0,
    averageRainfall: 0,
    averageHumidity: 0,
    plantDensity: 0,
    seedType: 'Hybrid',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [apiError, setApiError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.sowingDate) {
      newErrors.sowingDate = 'Sowing date is required';
    }

    if (formData.nitrogenApplied <= 0) {
      newErrors.nitrogenApplied = 'Nitrogen applied must be greater than 0';
    }

    if (formData.phosphorusApplied <= 0) {
      newErrors.phosphorusApplied = 'Phosphorus applied must be greater than 0';
    }

    if (formData.soilPh <= 0 || formData.soilPh > 14) {
      newErrors.soilPh = 'Soil pH must be between 0 and 14';
    }

    if (formData.averageTemperature <= -50 || formData.averageTemperature > 60) {
      newErrors.averageTemperature = 'Temperature must be between -50°C and 60°C';
    }

    if (formData.averageRainfall < 0) {
      newErrors.averageRainfall = 'Rainfall cannot be negative';
    }

    if (formData.averageHumidity < 0 || formData.averageHumidity > 100) {
      newErrors.averageHumidity = 'Humidity must be between 0% and 100%';
    }

    if (formData.plantDensity <= 0) {
      newErrors.plantDensity = 'Plant density must be greater than 0';
    }

    if (!formData.seedType) {
      newErrors.seedType = 'Seed type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'number' ? parseFloat(value) || 0 : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError('');
    setResult(null);

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PredictionResult = await response.json();
      setResult(data);
    } catch (error) {
      setApiError(
        error instanceof Error 
          ? `Failed to get prediction: ${error.message}` 
          : 'Failed to get prediction. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-6">
          <div className="flex items-center">
            <Sprout className="h-8 w-8 text-white mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-white">Maize Yield Prediction</h2>
              <p className="text-green-100 mt-1">Enter crop parameters to predict your harvest yield</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              label="Sowing Date"
              name="sowingDate"
              type="date"
              value={formData.sowingDate}
              onChange={handleInputChange}
              required
              error={errors.sowingDate}
            />

            <FormSelect
              label="Seed Type"
              name="seedType"
              value={formData.seedType}
              onChange={handleInputChange}
              options={['Hybrid', 'Local', 'Improved']}
              required
              error={errors.seedType}
            />

            <FormInput
              label="Fertilizer Nitrogen (N) Applied"
              name="nitrogenApplied"
              type="number"
              value={formData.nitrogenApplied}
              onChange={handleInputChange}
              placeholder="kg/ha"
              required
              min="0"
              error={errors.nitrogenApplied}
            />

            <FormInput
              label="Fertilizer Phosphorus (P) Applied"
              name="phosphorusApplied"
              type="number"
              value={formData.phosphorusApplied}
              onChange={handleInputChange}
              placeholder="kg/ha"
              required
              min="0"
              error={errors.phosphorusApplied}
            />

            <FormInput
              label="Soil pH"
              name="soilPh"
              type="number"
              value={formData.soilPh}
              onChange={handleInputChange}
              placeholder="0.0 - 14.0"
              required
              step="0.1"
              min="0"
              max="14"
              error={errors.soilPh}
            />

            <FormInput
              label="Average Temperature"
              name="averageTemperature"
              type="number"
              value={formData.averageTemperature}
              onChange={handleInputChange}
              placeholder="°C"
              required
              step="0.1"
              error={errors.averageTemperature}
            />

            <FormInput
              label="Average Rainfall"
              name="averageRainfall"
              type="number"
              value={formData.averageRainfall}
              onChange={handleInputChange}
              placeholder="mm"
              required
              min="0"
              step="0.1"
              error={errors.averageRainfall}
            />

            <FormInput
              label="Average Humidity"
              name="averageHumidity"
              type="number"
              value={formData.averageHumidity}
              onChange={handleInputChange}
              placeholder="%"
              required
              min="0"
              max="100"
              step="0.1"
              error={errors.averageHumidity}
            />

            <div className="md:col-span-2">
              <FormInput
                label="Plant Density"
                name="plantDensity"
                type="number"
                value={formData.plantDensity}
                onChange={handleInputChange}
                placeholder="plants/ha"
                required
                min="0"
                error={errors.plantDensity}
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Predict Yield</span>
                </>
              )}
            </button>
          </div>

          {apiError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{apiError}</p>
            </div>
          )}
        </form>
      </div>

      {result && <ResultsCard result={result} formData={formData} />}
    </div>
  );
};

export default PredictionForm;