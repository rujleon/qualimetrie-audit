// ============================================
// FONCTIONS UTILITAIRES (complexité = 1)
// ============================================

function isScoreBetween(score, min, max) {
  return score >= min && score <= max;
}

function hasAnciennete(anciennete, seuil) {
  return anciennete >= seuil;
}

function hasProjets(projets, seuil) {
  return projets >= seuil;
}

// ============================================
// TABLE DE CORRESPONDANCE (0 if/else)
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
  
  for (const rule of SCORE_RULES) {  // ✅ for-of, pas for classique
    if (score >= rule.min) return rule.appreciation;
  }
  return "Critique";
}

// ============================================
// FONCTION PRINCIPALE (complexité = 3)
// ============================================

function evaluerPerformance(score, anciennete, projets) {
  // Validations rapides
  if (score < 40) return "Critique - Action requise";
  if (score < 50) return "Insuffisant";
  
  // Bonus expert
  const estExpert = hasAnciennete(anciennete, 3) && hasProjets(projets, 5);
  if (estExpert && score >= 90) return "Exceptionnel + Bonus Expert";
  
  // Appréciation standard
  const appreciation = getAppreciationByScore(score);
  
  // Bonus simple
  if (hasAnciennete(anciennete, 2) || hasProjets(projets, 3)) {
    return appreciation + " (Bonus)";
  }
  
  return appreciation;
}

// ============================================
// ANALYSEUR DE DONNÉES (complexité = 2)
// ============================================

function analyserDonnees(elements) {
  if (!Array.isArray(elements)) return [];
  
  const resultats = [];
  for (const element of elements) {  // ✅ for-of
    resultats.push(traiterElement(element));
  }
  return resultats;
}

function traiterElement(element) {
  if (!element || element.actif === false) return null;
  if (element.valeur > 1000) return { ...element, valeur: 1000 };
  if (element.valeur < 0) return { ...element, valeur: 0 };
  return element;
}

// ============================================
// (Optionnel) Fonction calculateTotal
// ============================================

function calculateTotal(notes) {
  if (!Array.isArray(notes)) return 0;
  
  let total = 0;
  for (const note of notes) {  // ✅ for-of
    if (typeof note === 'number' && !isNaN(note)) {
      total += note;
    }
  }
  return total;
}

// ============================================
// EXPORT (si utilisé avec Node.js/modules)
// ============================================

// module.exports = { evaluerPerformance, analyserDonnees, calculateTotal };