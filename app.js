// ============================================
// FONCTIONS UTILITAIRES
// ============================================

function hasAnciennete(anciennete, seuil) {
  return anciennete >= seuil;
}

function hasProjets(projets, seuil) {
  return projets >= seuil;
}

// ============================================
// TABLE DE CORRESPONDANCE
// ============================================

const SCORE_RULES = [
  { min: 90, appreciation: "Exceptionnel" },
  { min: 80, appreciation: "Très bien" },
  { min: 70, appreciation: "Bien" },
  { min: 60, appreciation: "Assez bien" },
  { min: 50, appreciation: "Passable" },
  { min: 40, appreciation: "Insuffisant" }
];

function getAppreciationByScore(score) {
  if (score < 0 || score > 100) return "Score invalide";
  
  for (const rule of SCORE_RULES) {
    if (score >= rule.min) return rule.appreciation;
  }
  return "Critique";
}

// ============================================
// FONCTION PRINCIPALE - evaluerPerformance
// ============================================

function evaluerPerformance(score, anciennete, projets) {
  // Test: score < 40 → Critique
  if (score < 40) return "Critique - Action requise";
  
  // Test: score 40-49 → Insuffisant
  if (score < 50) return "Insuffisant";
  
  // Test: expert avec score ≥ 90 → Bonus Expert
  const estExpert = hasAnciennete(anciennete, 3) && hasProjets(projets, 5);
  if (estExpert && score >= 90) return "Exceptionnel + Bonus Expert";
  
  // Appréciation de base
  const appreciation = getAppreciationByScore(score);
  
  // Test: bonus pour anciennete ≥ 2 ou projets ≥ 3
  if (hasAnciennete(anciennete, 2) || hasProjets(projets, 3)) {
    return appreciation + " (Bonus)";
  }
  
  return appreciation;
}

// ============================================
// ANALYSEUR DE DONNÉES - analyserDonnees
// (Version qui passe TOUS les tests)
// ============================================

function analyserDonnees(elements) {
  // Test 1: entrée invalide (null, undefined, pas un tableau)
  if (!elements) return [];
  if (!Array.isArray(elements)) return [];
  
  // Test 2: tableau vide
  if (elements.length === 0) return [];
  
  // Traitement normal
  const resultats = [];
  
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    
    // Test 3: éléments null ou undefined (ignorer)
    if (element === null || element === undefined) {
      continue;
    }
    
    // Test 4: éléments inactifs (ignorer)
    if (element.actif === false) {
      continue;
    }
    
    // Copier l'élément
    const nouveauElement = { ...element };
    
    // Test 5: valeurs > 1000 → 1000
    if (nouveauElement.valeur > 1000) {
      nouveauElement.valeur = 1000;
    }
    
    // Test 6: valeurs < 0 → 0
    if (nouveauElement.valeur < 0) {
      nouveauElement.valeur = 0;
    }
    
    resultats.push(nouveauElement);
  }
  
  return resultats;
}

// ============================================
// CALCULATE TOTAL
// ============================================

function calculateTotal(notes) {
  // Test: entrée invalide
  if (!Array.isArray(notes)) return 0;
  
  // Test: tableau vide
  if (notes.length === 0) return 0;
  
  let total = 0;
  for (const note of notes) {
    // Test: ignorer les valeurs non numériques
    if (typeof note === 'number' && !Number.isNaN(note)) {
      total += note;
    }
  }
  return total;
}

// ============================================
// EXPORTS (indispensable pour les tests)
// ============================================

module.exports = {
  evaluerPerformance,
  analyserDonnees,
  calculateTotal
};