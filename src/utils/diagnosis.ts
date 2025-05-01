export function simulateDiagnosis(symptoms: string): string {
    const s = symptoms.toLowerCase();
  
    if (s.includes('fiebre') && s.includes('dolor abdominal')) {
      return 'Podría tratarse de una apendicitis. Se recomienda acudir a un centro médico para evaluación inmediata.';
    }
  
    if (s.includes('tos') && s.includes('fiebre')) {
      return 'Podría tratarse de una infección respiratoria. Se recomienda reposo y seguimiento médico.';
    }
  
    return 'No se pudo determinar un diagnóstico claro. Consulte con un médico.';
  }
  