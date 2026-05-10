// CODE VOLONTAIREMENT MAL STRUCTURÉ
// Complexité cyclomatique élevée pour l'audit

function additionner(a, b) {
    return a + b;
}

function evaluerPerformance(score, anciennete, projets) {
    let appreciation = "";
    
    if (score >= 90) {
        if (anciennete >= 5) {
            if (projets >= 10) {
                if (score >= 95) {
                    if (projets >= 15) {
                        appreciation = "Excellent +++";
                    } else {
                        appreciation = "Excellent +";
                    }
                } else {
                    appreciation = "Excellent";
                }
            } else {
                if (score >= 92) {
                    appreciation = "Très bon +";
                } else {
                    appreciation = "Très bon";
                }
            }
        } else {
            if (projets >= 8) {
                if (score >= 93) {
                    appreciation = "Bon potentiel";
                } else {
                    appreciation = "Bon";
                }
            } else {
                appreciation = "Correct";
            }
        }
    } else if (score >= 75) {
        if (anciennete >= 3) {
            if (projets >= 5) {
                appreciation = "Satisfaisant";
            } else {
                if (score >= 80) {
                    appreciation = "Moyen supérieur";
                } else {
                    appreciation = "Moyen";
                }
            }
        } else {
            appreciation = "À améliorer";
        }
    } else {
        if (score >= 60) {
            appreciation = "Passable";
        } else {
            if (score >= 40) {
                appreciation = "Insuffisant";
            } else {
                appreciation = "Critique";
            }
        }
    }
    
    let total = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (i > j) {
                if (i % 2 === 0) {
                    total += i * j;
                } else {
                    total += i + j;
                }
            } else {
                if (j % 2 === 0) {
                    total += i + j;
                } else {
                    total += i * j;
                }
            }
        }
    }
    
    return appreciation + " (" + total + " points)";
}

function analyserDonnees(valeurs) {
    let resultats = [];
    
    for (let i = 0; i < valeurs.length; i++) {
        for (let j = 0; j < valeurs.length; j++) {
            if (valeurs[i] > valeurs[j]) {
                if (i === j) {
                    resultats.push(valeurs[i] * 2);
                } else if (i < j) {
                    if (valeurs[j] > 0) {
                        resultats.push(valeurs[i] + valeurs[j]);
                    } else {
                        resultats.push(valeurs[i] - valeurs[j]);
                    }
                } else {
                    if (valeurs[i] > 10) {
                        resultats.push(valeurs[i] / valeurs[j]);
                    } else {
                        resultats.push(valeurs[j] - valeurs[i]);
                    }
                }
            } else {
                if (valeurs[i] === valeurs[j]) {
                    resultats.push(0);
                } else {
                    for (let k = 0; k < 3; k++) {
                        resultats.push(valeurs[i] * k);
                    }
                }
            }
        }
    }
    
    return resultats;
}

export { additionner, evaluerPerformance, analyserDonnees };
