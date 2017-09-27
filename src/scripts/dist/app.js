var $ = window.$;
$(document).ready(function () {
    var tp = new LNF.Components.TrainingsPlaner();
    tp.init();
    $('#lnf-app-trainingsplaner-run').click(function () {
        tp.run();
    });
});
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
                var tp = this.mapping[result.trainDays];
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
                showTimeMessage = (7 - restDays > form.time);
                return new LNF.Model.TrainingResult(restDays, doCardio, showTimeMessage);
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
        var TrainingResult = (function () {
            function TrainingResult(restDays, doCardio, showTimeMessage) {
                this.restDays = restDays;
                this.trainDays = 7 - restDays;
                this.doCardio = doCardio;
                this.showTimeMessage = showTimeMessage;
            }
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
