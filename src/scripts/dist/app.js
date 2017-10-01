var $ = window.$;
$(document).ready(function () {
    var tp = new LNF.Components.TrainingsPlaner();
    var np = new LNF.Components.NutritionPlaner();
    tp.init();
    np.init();
    $('#js-lnf-app-trainingsplaner-run').click(function () {
        tp.run();
    });
    $('#js-lnf-app-nutritionplaner-run').click(function () {
        np.run();
    });
    var $inputInfoEmail = $('#inputInfoEmail');
    var $btnInfoEmail = $('#btnInfoEmail');
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $inputInfoEmail.keyup(function () {
        if (emailRegex.test($inputInfoEmail.val())) {
            $btnInfoEmail.removeAttr('disabled');
        }
        else {
            $btnInfoEmail.attr('disabled', 'disabled');
        }
    });
});
var LNF;
(function (LNF) {
    var Components;
    (function (Components) {
        var NutritionPlaner = (function () {
            function NutritionPlaner() {
            }
            NutritionPlaner.prototype.getFormData = function () {
                var age = +$('#inputAge').val();
                var gender = +$('#inputGender').val();
                var size = +$('#inputSize').val();
                var weight = +$('#inputWeight').val();
                var activity = +$('#inputActivity').val();
                var habits = +$('#inputHabits').val();
                var target = +$('#inputTarget').val();
                var disciplin = +$('#inputDisciplin').val();
                return new LNF.Model.Nutrition(age, gender, size, weight, activity, habits, target, disciplin);
            };
            NutritionPlaner.prototype.showError = function () {
                $('#js-lnf-app-nutritionplaner-error').show();
            };
            NutritionPlaner.prototype.getResultTemplate = function (nutrition) {
                var targetCalories;
                var targetLabel;
                var targetNutritionPlan;
                var targetHabits = '';
                var targetDisciplin = '';
                switch (nutrition.target) {
                    case 0:
                        targetCalories = nutrition.totalCalories;
                        targetLabel = "Wohlbefinden verbessern";
                        targetNutritionPlan = "A1 oder A2";
                        break;
                    case 1:
                        targetLabel = "Muskel- und Kraftaufbau";
                        targetCalories = nutrition.bulkCalories;
                        targetNutritionPlan = "B1 oder B2";
                        break;
                    case 2:
                        targetLabel = "Fettreduktion (Abnehmen)";
                        targetCalories = nutrition.diatCalories;
                        targetNutritionPlan = "C1 oder C2";
                }
                switch (nutrition.habits) {
                    case 1:
                        targetHabits = "Schaue Dir hierbei auch das spezielle Kapitel für Vegetaria an.";
                        break;
                    case 2:
                        targetHabits = "Schaue Dir hierbei auch das spezielle Kapitel für Veganer an.";
                        break;
                    case 3:
                        targetHabits = "Schaue Dir hierbei auch das spezielle Kapitel bezüglich Nahrungsunverträglichkeiten an.";
                        break;
                }
                if (nutrition.disciplin == 0 || nutrition.disciplin == 1) {
                    targetDisciplin = "<h2 class=\"lnf-branding\">Motivation und Disziplin</h2>\n                             <p>Da es Dir schwer fallen kann, die n\u00F6tige Disziplin f\u00FCr eine Ern\u00E4hrungsumstellung an den Tag zu legen,\n                             solltest du Dir unbedingt das Kapitel <strong>Motivation und Disziplin</strong> im Ern\u00E4hrungshandbuch anschauen.  </p>";
                }
                return "<div class=\"lnf-app-trainingsplaner-result\">\n                  <h2 class=\"lnf-branding\">Kalorien</h2>\n                  <p>Dein Grundumsatz liegt aktuell bei <strong>" + nutrition.baseMetabolism + " kcal/Tag.</strong></p>\n                  <p>Die Gesamtkalorien liegen bei deinem aktuellen Aktivit\u00E4tslevel bei <strong>" + nutrition.totalCalories + " kcal/Tag</strong></p>\n                  <h2 class=\"lnf-branding\">" + targetLabel + "</h2>\n                  <p>\n                    F\u00FCr Deine Zielsetzung <strong>" + targetLabel + "</strong>, solltest du aktuell <strong>" + targetCalories + " kcal/Tag</strong> zu dir nehmen.\n                    Ideal geeignet w\u00E4ren f\u00FCr dich die Ern\u00E4hrungspl\u00E4ne <strong>" + targetNutritionPlan + "</strong> aus dem Ern\u00E4hrungshandbuch.\n                    " + targetHabits + "\n                  </p>\n                  " + targetDisciplin + "\n                  <a class=\"btn btn-lnf\" href=\"app-nutritionplaner.html\">Erneut Starten</a>\n                </div>";
            };
            NutritionPlaner.prototype.init = function () {
                $('#js-lnf-app-nutritionplaner-error button').click(function () {
                    $('#js-lnf-app-nutritionplaner-error').hide();
                });
            };
            NutritionPlaner.prototype.run = function () {
                var $resultContainer = $('#js-lnf-app-nutritionplaner-result')[0];
                var $adContainer = $('#js-lnf-nutritionplaner-book');
                var $formContainer = $('#js-lnf-app-nutritionplaner-form');
                var form = this.getFormData();
                if (form.isValid()) {
                    var template = this.getResultTemplate(form);
                    $resultContainer.innerHTML = template;
                    $adContainer.show();
                    $formContainer.hide();
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                }
                else {
                    this.showError();
                }
            };
            return NutritionPlaner;
        }());
        Components.NutritionPlaner = NutritionPlaner;
    })(Components = LNF.Components || (LNF.Components = {}));
})(LNF || (LNF = {}));
var LNF;
(function (LNF) {
    var Components;
    (function (Components) {
        var TrainingsPlaner = (function () {
            function TrainingsPlaner() {
                this.mapping = [
                    { bests: [], goods: [] },
                    { bests: ['Ganzkörperplan A'], goods: [] },
                    { bests: ['Ganzkörperplan B', 'Oberkörper-Unterkörperplan A'], goods: ['Ganzkörperplan A', 'Oberkörper-Unterkörperplan B'] },
                    { bests: ['Push Pull Beine A', 'Push Pull Beine B', '3er Split'], goods: ['Ganzkörperplan A', 'Ganzkörperplan B'] },
                    { bests: ['Oberkörper-Unterkörperplan B', '4er Split'], goods: ['Ganzkörperplan B', 'Oberkörper-Unterkörperplan A'] },
                    { bests: ['Oberkörper-Unterkörperplan B', '5er Split'], goods: [] },
                    { bests: ['Push Pull Beine B', '6er Split'], goods: ['Push Pull Beine A'] }
                ];
            }
            TrainingsPlaner.prototype.getFormData = function () {
                var age = +$('#inputAge').val();
                var gender = +$('#inputGender').val();
                var size = +$('#inputSize').val();
                var weight = +$('#inputWeight').val();
                var bodyfat = +$('#inputBodyFat').val();
                var work = +$('#inputWork').val();
                var activity = +$('#inputActivity').val();
                var experience = +$('#inputExperience').val();
                var regeneration = +$('#inputRegeneration').val();
                var time = +$('#inputTime').val();
                return new LNF.Model.Training(age, gender, size, weight, bodyfat, work, activity, experience, regeneration, time);
            };
            TrainingsPlaner.prototype.getResultTemplate = function (result) {
                var tp = result.isBusy()
                    ? this.mapping[result.time]
                    : this.mapping[result.trainDays];
                var bestsTemplate = '';
                var goodsTemplate = '';
                var cardioTemplate = '';
                for (var _i = 0, _a = tp.bests; _i < _a.length; _i++) {
                    var best = _a[_i];
                    bestsTemplate += "<li><i class=\"fa fa-check\"></i><span>" + best + "</span></li>";
                }
                if (result.doCardio) {
                    cardioTemplate = "<h2 class=\"lnf-branding\">Cardio</h2>\n                            <p>\n                              Laut Deiner aktuellen Verfassung solltest du auch Cardio mit in dein Training einbauen.\n                              Schaue Dir hierf\u00FCr den Abschnitt Cardio im Traingshandbuch an, und integriere eine Variante als festen Bestandteil deiner Workouts.\n                            </p>";
                }
                if (tp.goods.length) {
                    goodsTemplate += "<h2 class=\"lnf-branding\">Alternativen</h2>\n          <p>Diese Pl\u00E4ne k\u00E4men als Alternative auch in Frage:</p>\n          <ul class=\"lnf-app-trainingsplaner-goods\">";
                    for (var _b = 0, _c = tp.goods; _b < _c.length; _b++) {
                        var good = _c[_b];
                        goodsTemplate += "<li><i class=\"fa fa-check\"></i><span>" + good + "</span></li>";
                    }
                    goodsTemplate += "</ul>";
                }
                return "<div class=\"lnf-app-trainingsplaner-result\">\n                  <h2 class=\"lnf-branding\">Top Pl\u00E4ne</h2>\n                  <p>Folgende Trainingspl\u00E4ne aus dem Trainingshandbuch w\u00E4ren f\u00FCr Dich ideal geeignet:</p>\n                  <ul class=\"lnf-app-trainingsplaner-bests\">\n                    " + bestsTemplate + "\n                  </ul>\n                  " + goodsTemplate + "\n                  " + cardioTemplate + "\n                  <a class=\"btn btn-lnf\" href=\"app-trainingsplaner.html\">Erneut Starten</a>\n                </div>";
            };
            TrainingsPlaner.prototype.showError = function () {
                $('#js-lnf-app-trainingsplaner-error').show();
            };
            TrainingsPlaner.prototype.evaluate = function (form) {
                var doCardio = false;
                var showTimeMessage = false;
                var restDays = 0;
                // AGE
                if (form.age >= 30 && form.age < 40) {
                    restDays += 1;
                }
                else if (form.age > 40) {
                    restDays += 2;
                }
                //BODYFAT - WORK - ACTIVITY WOMEN
                if (form.gender == 0) {
                    doCardio = form.bodyfat > 20;
                    if (form.work == 1 || form.work == 2) {
                        restDays += 1;
                    }
                    if (form.activity == 1 || form.activity == 2) {
                        restDays += 1;
                    }
                }
                else {
                    doCardio = form.bodyfat > 15;
                    if (form.work == 2) {
                        restDays += 1;
                    }
                    if (form.activity == 2) {
                        restDays += 1;
                    }
                    if (form.work == 1 && form.work == 1) {
                        restDays += 1;
                    }
                }
                // EXPERIENCE
                if (form.experience > 10) {
                    restDays += 1;
                }
                // REGENERATION
                if (form.regeneration == 1) {
                    restDays += 1;
                }
                else if (form.regeneration == 2) {
                    restDays += 2;
                }
                //TIME
                return new LNF.Model.TrainingResult(restDays, doCardio, form.time);
            };
            TrainingsPlaner.prototype.init = function () {
                $('#js-lnf-app-trainingsplaner-error button').click(function () {
                    $('#js-lnf-app-trainingsplaner-error').hide();
                });
            };
            TrainingsPlaner.prototype.run = function () {
                var $resultContainer = $('#js-lnf-app-trainingsplaner-result')[0];
                var $adContainer = $('#js-lnf-trainingsplaner-book');
                var $formContainer = $('#js-lnf-app-trainingsplaner-form');
                var form = this.getFormData();
                if (form.isValid()) {
                    var result = this.evaluate(form);
                    var template = this.getResultTemplate(result);
                    $resultContainer.innerHTML = template;
                    $adContainer.show();
                    $formContainer.hide();
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                }
                else {
                    this.showError();
                }
            };
            return TrainingsPlaner;
        }());
        Components.TrainingsPlaner = TrainingsPlaner;
    })(Components = LNF.Components || (LNF.Components = {}));
})(LNF || (LNF = {}));
var LNF;
(function (LNF) {
    var Model;
    (function (Model) {
        var Nutrition = (function () {
            function Nutrition(age, gender, size, weight, activity, habits, target, disciplin) {
                this.age = age;
                this.gender = gender;
                this.size = size;
                this.weight = weight;
                this.activity = activity;
                this.habits = habits;
                this.target = target;
                this.disciplin = disciplin;
                // WOMEN
                if (this.gender == 0) {
                    this.baseMetabolism = Math.round(655 + (9.6 * this.weight) + (1.8 * this.size) - (4.7 * this.age));
                }
                else {
                    this.baseMetabolism = Math.round(66 + (13.7 * this.weight) + (5 * this.size) - (6.8 * this.age));
                }
                this.totalCalories = Math.round((this.baseMetabolism * this.activity));
                this.diatCalories = Math.round(this.totalCalories - (500 - (this.activity * 80)));
                this.bulkCalories = Math.round(this.totalCalories + (400 + (this.activity * 80)));
            }
            Nutrition.prototype.isValid = function () {
                return this.gender >= 0 &&
                    this.size > 0 &&
                    this.weight > 0 &&
                    this.activity >= 0 &&
                    this.habits >= 0 &&
                    this.target >= 0 &&
                    this.disciplin >= 0;
            };
            return Nutrition;
        }());
        Model.Nutrition = Nutrition;
    })(Model = LNF.Model || (LNF.Model = {}));
})(LNF || (LNF = {}));
var LNF;
(function (LNF) {
    var Model;
    (function (Model) {
        var TrainingResult = (function () {
            function TrainingResult(restDays, doCardio, time) {
                this.restDays = restDays;
                this.trainDays = 7 - restDays;
                this.doCardio = doCardio;
                this.time = time;
            }
            TrainingResult.prototype.isBusy = function () {
                return (7 - this.restDays > this.time);
            };
            return TrainingResult;
        }());
        Model.TrainingResult = TrainingResult;
    })(Model = LNF.Model || (LNF.Model = {}));
})(LNF || (LNF = {}));
var LNF;
(function (LNF) {
    var Model;
    (function (Model) {
        var Training = (function () {
            function Training(age, gender, size, weight, bodyfat, work, activity, experience, regeneration, time) {
                this.age = age;
                this.gender = gender;
                this.size = size;
                this.weight = weight;
                this.bodyfat = bodyfat;
                this.work = work;
                this.activity = activity;
                this.experience = experience;
                this.regeneration = regeneration;
                this.time = time;
            }
            Training.prototype.isValid = function () {
                return this.gender >= 0 &&
                    this.size > 0 &&
                    this.weight > 0 &&
                    this.bodyfat > 0 &&
                    this.work >= 0 &&
                    this.activity >= 0 &&
                    this.experience >= 0 &&
                    this.regeneration >= 0 &&
                    this.time >= 0 && this.time <= 7;
            };
            return Training;
        }());
        Model.Training = Training;
    })(Model = LNF.Model || (LNF.Model = {}));
})(LNF || (LNF = {}));
