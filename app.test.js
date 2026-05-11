// ============================================
// IMPORT (récupère les fonctions exportées)
// ============================================

const {
  evaluerPerformance,
  analyserDonnees,
  calculateTotal,
} = require('./app');

// ============================================
// TESTS pour evaluerPerformance
// ============================================

describe('evaluerPerformance', () => {
  test('devrait retourner "Critique - Action requise" pour score < 40', () => {
    expect(evaluerPerformance(30, 2, 3)).toBe('Critique - Action requise');
    expect(evaluerPerformance(0, 5, 5)).toBe('Critique - Action requise');
    expect(evaluerPerformance(39, 1, 1)).toBe('Critique - Action requise');
  });

  test('devrait retourner "Insuffisant" pour score entre 40 et 49', () => {
    expect(evaluerPerformance(40, 2, 3)).toBe('Insuffisant');
    expect(evaluerPerformance(45, 2, 3)).toBe('Insuffisant');
    expect(evaluerPerformance(49, 10, 10)).toBe('Insuffisant');
  });

  test('devrait retourner "Exceptionnel + Bonus Expert" pour expert avec score >= 90', () => {
    expect(evaluerPerformance(90, 3, 5)).toBe('Exceptionnel + Bonus Expert');
    expect(evaluerPerformance(95, 3, 5)).toBe('Exceptionnel + Bonus Expert');
    expect(evaluerPerformance(100, 5, 10)).toBe('Exceptionnel + Bonus Expert');
  });

  test('devrait retourner appréciation avec bonus pour anciennete >= 2', () => {
    expect(evaluerPerformance(85, 2, 1)).toContain('Bonus');
    expect(evaluerPerformance(75, 2, 0)).toContain('Bonus');
  });

  test('devrait retourner appréciation avec bonus pour projets >= 3', () => {
    expect(evaluerPerformance(85, 0, 3)).toContain('Bonus');
    expect(evaluerPerformance(75, 0, 5)).toContain('Bonus');
  });

  test('devrait retourner appréciation sans bonus pour conditions non remplies', () => {
    const resultat = evaluerPerformance(85, 1, 2);
    expect(resultat).not.toContain('Bonus');
    expect(resultat).toBe('Très bien');
  });

  test('devrait retourner "Exceptionnel" pour score >= 90 sans bonus', () => {
    expect(evaluerPerformance(92, 0, 0)).toBe('Exceptionnel');
  });

  test('devrait retourner "Très bien" pour score 80-89', () => {
    expect(evaluerPerformance(80, 0, 0)).toBe('Très bien');
    expect(evaluerPerformance(85, 1, 2)).toBe('Très bien');
  });

  test('devrait retourner "Bien" pour score 70-79', () => {
    expect(evaluerPerformance(70, 0, 0)).toBe('Bien');
    expect(evaluerPerformance(75, 0, 0)).toBe('Bien');
  });
});

// ============================================
// TESTS pour analyserDonnees
// ============================================

describe('analyserDonnees', () => {
  test('devrait retourner un tableau vide si entrée invalide', () => {
    expect(analyserDonnees(null)).toEqual([]);
    expect(analyserDonnees(undefined)).toEqual([]);
    expect(analyserDonnees('pas tableau')).toEqual([]);
    expect(analyserDonnees(123)).toEqual([]);
  });

  test('devrait retourner tableau vide si tableau vide', () => {
    expect(analyserDonnees([])).toEqual([]);
  });

  test('devrait filtrer les éléments inactifs', () => {
    const elements = [
      { actif: true, valeur: 50 },
      { actif: false, valeur: 100 },
      { actif: true, valeur: 200 },
      { actif: false, valeur: 300 },
    ];
    const resultat = analyserDonnees(elements);
    expect(resultat).toHaveLength(2);
    expect(resultat[0].valeur).toBe(50);
    expect(resultat[1].valeur).toBe(200);
  });

  test('devrait traiter les éléments null/undefined', () => {
    const elements = [null, undefined, { actif: true, valeur: 100 }];
    const resultat = analyserDonnees(elements);
    expect(resultat).toHaveLength(1);
    expect(resultat[0].valeur).toBe(100);
  });

  test('devrait limiter les valeurs > 1000 à 1000', () => {
    const elements = [
      { actif: true, valeur: 1001 },
      { actif: true, valeur: 2000 },
      { actif: true, valeur: 5000 },
    ];
    const resultat = analyserDonnees(elements);
    resultat.forEach((item) => {
      expect(item.valeur).toBe(1000);
    });
  });

  test('devrait remplacer les valeurs négatives par 0', () => {
    const elements = [
      { actif: true, valeur: -1 },
      { actif: true, valeur: -100 },
      { actif: true, valeur: -999 },
    ];
    const resultat = analyserDonnees(elements);
    resultat.forEach((item) => {
      expect(item.valeur).toBe(0);
    });
  });

  test('devrait conserver les valeurs normales', () => {
    const elements = [
      { actif: true, valeur: 500 },
      { actif: true, valeur: 0 },
      { actif: true, valeur: 100 },
    ];
    const resultat = analyserDonnees(elements);
    expect(resultat[0].valeur).toBe(500);
    expect(resultat[1].valeur).toBe(0);
    expect(resultat[2].valeur).toBe(100);
  });
});

// ============================================
// TESTS pour calculateTotal
// ============================================

describe('calculateTotal', () => {
  test('devrait retourner 0 pour entrée invalide', () => {
    expect(calculateTotal(null)).toBe(0);
    expect(calculateTotal(undefined)).toBe(0);
    expect(calculateTotal('pas tableau')).toBe(0);
    expect(calculateTotal(123)).toBe(0);
  });

  test('devrait retourner 0 pour tableau vide', () => {
    expect(calculateTotal([])).toBe(0);
  });

  test('devrait calculer la somme des nombres valides', () => {
    expect(calculateTotal([10, 20, 30])).toBe(60);
    expect(calculateTotal([5, 15, 25])).toBe(45);
    expect(calculateTotal([100, 200, 300])).toBe(600);
  });

  test('devrait ignorer les valeurs non numériques', () => {
    expect(calculateTotal([10, '20', 30, null, undefined, 'abc'])).toBe(40);
    expect(calculateTotal([Number.isNaN, 10, 20])).toBe(30);
  });

  test('devrait gérer les nombres flottants', () => {
    expect(calculateTotal([1.5, 2.5, 3])).toBe(7);
    expect(calculateTotal([0.1, 0.2, 0.3])).toBeCloseTo(0.6);
  });
});
