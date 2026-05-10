// CODE VOLONTAIREMENT MAL STRUCTURÉ - Complexité élevée

function additionner(a, b) {
    return a + b;
}

// Fonction très complexe (complexité > 20)
function evaluerPerformance(score, anciennete, projets) {
    let resultat = "";
    
    if (score >= 90) {
        if (anciennete >= 5) {
            if (projets >= 10) {
                if (score >= 95) {
                    if (projets >= 15) {
                        resultat = "Excellent +++";
                    } else {
                        resultat = "Excellent +";
                    }
                } else {
                    resultat = "Excellent";
                }
            } else {
                if (score >= 92) {
                    resultat = "Très bon +";
                } else {
                    resultat = "Très bon";
                }
            }
        } else {
            if (projets >= 8) {
                if (score >= 93) {
                    resultat = "Bon potentiel";
                } else {
                    resultat = "Bon";
                }
            } else {
                resultat = "Correct";
            }
        }
    } else if (score >= 75) {
        if (anciennete >= 3) {
            if (projets >= 5) {
                resultat = "Satisfaisant";
            } else {
                if (score >= 80) {
                    resultat = "Moyen supérieur";
                } else {
                    resultat = "Moyen";
                }
            }
        } else {
            resultat = "À améliorer";
        }
    } else {
        if (score >= 60) {
            resultat = "Passable";
        } else {
            if (score >= 40) {
                resultat = "Insuffisant";
            } else {
                resultat = "Critique";
            }
        }
    }
    
    // Boucles imbriquées
    let total = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (i > j) {
                if (i % 2 === 0) {
                    total += i * j;
                } else {
                    total += i + j;
                }
            }
        }
    }
    
    return resultat + " (" + total + ")";
}

export { additionner, evaluerPerformance };
