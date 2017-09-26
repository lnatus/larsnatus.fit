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
                var $container = $('#js-lnf-app-trainingsplaner-result')[0];
                var form = this.getFormData();
                if (form.isValid()) {
                    var result_1 = this.evaluate(form);
                    console.log(result_1);
                }
                else {
                    this.showError();
                }
                var result = "<div>\n                          Result goes here...\n                        </div>";
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
