import React from 'react';
import { TrendingUp, Calendar, Target } from 'lucide-react';
import { PredictionResult, PredictionFormData } from '../types/prediction';

interface ResultsCardProps {
  result: PredictionResult;
  formData: PredictionFormData;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ result, formData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getYieldCategory = (yieldValue: number) => {
    if (yieldValue >= 8000) return { category: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
    if (yieldValue >= 6000) return { category: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (yieldValue >= 4000) return { category: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { category: 'Below Average', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const yieldInfo = getYieldCategory(result.predictedYield);

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center">
          <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">Yield Prediction Results</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Main Result */}
          <div className="space-y-4">
            <div className={`${yieldInfo.bg} rounded-lg p-4 border`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Predicted Yield</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {result.predictedYield.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">kg/ha</p>
                </div>
                <div className={`${yieldInfo.bg} rounded-full p-3`}>
                  <Target className={`h-8 w-8 ${yieldInfo.color}`} />
                </div>
              </div>
            </div>

            <div className={`${yieldInfo.bg} rounded-lg p-3 border`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Yield Category</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${yieldInfo.color} ${yieldInfo.bg} border`}>
                  {yieldInfo.category}
                </span>
              </div>
            </div>
          </div>

          {/* Input Summary */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              Input Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Sowing Date:</span>
                <span className="font-medium">{formatDate(formData.sowingDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seed Type:</span>
                <span className="font-medium">{formData.seedType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nitrogen (N):</span>
                <span className="font-medium">{formData.nitrogenApplied} kg/ha</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phosphorus (P):</span>
                <span className="font-medium">{formData.phosphorusApplied} kg/ha</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Soil pH:</span>
                <span className="font-medium">{formData.soilPh}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plant Density:</span>
                <span className="font-medium">{formData.plantDensity.toLocaleString()} plants/ha</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>Note:</strong> This prediction is based on the provided agricultural parameters and historical data patterns. 
            Actual yields may vary due to factors such as weather conditions, pest management, and cultivation practices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;