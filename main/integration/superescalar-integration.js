"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Superescalar_1 = require("../core/Superescalar/Superescalar");
var main_consts_1 = require("../main-consts");
var store_1 = require("../store");
var actions_1 = require("../interface/actions");
var FunctionalUnit_1 = require("../core/Common/FunctionalUnit");
var history_1 = require("../interface/actions/history");
var reducers_1 = require("../interface/reducers");
var i18next_1 = require("i18next");
var Code_1 = require("../core/Common/Code");
var SuperescalarEnums_1 = require("../core/Superescalar/SuperescalarEnums");
var modals_1 = require("../interface/actions/modals");
var machine_integration_1 = require("./machine-integration");
var SuperescalarIntegration = /** @class */ (function (_super) {
    tslib_1.__extends(SuperescalarIntegration, _super);
    function SuperescalarIntegration() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Global objects for binding React to the View
        _this.superescalar = new Superescalar_1.Superescalar();
        _this.codeLoaded = false;
        _this.interval = null;
        _this.backStep = 0;
        _this.stopCondition = main_consts_1.ExecutionStatus.EXECUTABLE;
        _this.finishedExecution = false;
        _this.executing = false;
        _this.replications = 0;
        _this.cacheFailPercentage = 0;
        _this.cacheFailLatency = 0;
        /*
        * This call all the components to update the state
        * if there is a step param, the components will use
        * their history to set the appropiate content
        */
        _this.dispatchAllSuperescalarActions = function (step) {
            // Code should only be setted on the first iteration
            store_1.store.dispatch(actions_1.batchActions(actions_1.nextJumpTableCycle(_this.superescalar.jumpPrediction), actions_1.nextPrefetchCycle(_this.superescalar.prefetchUnit), actions_1.nextDecoderCycle(_this.superescalar.decoder), actions_1.nextFunctionalUnitCycle(tslib_1.__spread(_this.superescalar.functionalUnit, [_this.superescalar.aluMem])), actions_1.nextReserveStationCycle([{
                    data: _this.superescalar.reserveStationEntry[0],
                    size: _this.superescalar.getReserveStationSize(0)
                },
                {
                    data: _this.superescalar.reserveStationEntry[1],
                    size: _this.superescalar.getReserveStationSize(1)
                },
                {
                    data: _this.superescalar.reserveStationEntry[2],
                    size: _this.superescalar.getReserveStationSize(2)
                },
                {
                    data: _this.superescalar.reserveStationEntry[3],
                    size: _this.superescalar.getReserveStationSize(3)
                },
                {
                    data: _this.superescalar.reserveStationEntry[4],
                    size: _this.superescalar.getReserveStationSize(4)
                },
                {
                    data: _this.superescalar.reserveStationEntry[5],
                    size: _this.superescalar.getReserveStationSize(5)
                }]), actions_1.nextReorderBufferMapperCycle([_this.superescalar.ROBGpr, _this.superescalar.ROBFpr]), actions_1.nextReorderBufferCycle(_this.superescalar.reorderBuffer.elements), actions_1.nextRegistersCycle([_this.superescalar.gpr.content, _this.superescalar.fpr.content]), actions_1.nextMemoryCycle(_this.superescalar.memory.data), actions_1.nextCycle(_this.superescalar.status.cycle), history_1.pushHistory()));
        };
        _this.superExe = function (reset) {
            if (reset === void 0) { reset = true; }
            _this.superescalar.init(reset);
        };
        _this.stepForward = function () {
            if (!_this.superescalar.code) {
                return;
            }
            if (_this.backStep > 0) {
                _this.backStep--;
                store_1.store.dispatch(history_1.takeHistory(_this.backStep));
            }
            else {
                if (_this.finishedExecution) {
                    _this.finishedExecution = false;
                    var code = Object.assign(new Code_1.Code(), _this.superescalar.code);
                    _this.superExe();
                    _this.superescalar.code = code;
                    // Load memory content
                    if (_this.contentIntegration) {
                        _this.setFpr(_this.contentIntegration.FPRContent);
                        _this.setGpr(_this.contentIntegration.GPRContent);
                        _this.setMemory(_this.contentIntegration.MEMContent);
                    }
                }
                var machineStatus = _this.superescalar.tic();
                _this.dispatchAllSuperescalarActions();
                return machineStatus;
            }
        };
        _this.loadCode = function (code) {
            _this.superescalar.code = code;
            _this.resetMachine();
            // There is no need to update the code with the rest,
            // it should remain the same during all the program execution
            store_1.store.dispatch(actions_1.superescalarLoad(code.instructions));
        };
        _this.play = function () {
            if (!_this.superescalar.code) {
                return;
            }
            _this.stopCondition = main_consts_1.ExecutionStatus.EXECUTABLE;
            _this.backStep = 0;
            _this.executing = true;
            var speed = _this.calculateSpeed();
            if (_this.finishedExecution) {
                _this.finishedExecution = false;
                var code = Object.assign(new Code_1.Code(), _this.superescalar.code);
                _this.superExe();
                _this.superescalar.code = code;
                // Load memory content
                if (_this.contentIntegration) {
                    _this.setFpr(_this.contentIntegration.FPRContent);
                    _this.setGpr(_this.contentIntegration.GPRContent);
                    _this.setMemory(_this.contentIntegration.MEMContent);
                }
            }
            if (speed) {
                _this.executionLoop(speed);
            }
            else {
                // tslint:disable-next-line:no-empty
                while (_this.superescalar.tic() !== SuperescalarEnums_1.SuperescalarStatus.SUPER_ENDEXE) { }
                _this.dispatchAllSuperescalarActions();
                _this.finishedExecution = true;
                alert(i18next_1.t('execution.finished'));
            }
        };
        _this.makeBatchExecution = function () {
            if (!_this.superescalar.code) {
                return;
            }
            var results = [];
            for (var i = 0; i < _this.replications; i++) {
                var code = Object.assign(new Code_1.Code(), _this.superescalar.code);
                _this.superExe();
                _this.superescalar.code = code;
                _this.superescalar.memory.failProbability = _this.cacheFailPercentage;
                _this.superescalar.memoryFailLatency = _this.cacheFailLatency;
                // Load memory content
                if (_this.contentIntegration) {
                    _this.setFpr(_this.contentIntegration.FPRContent);
                    _this.setGpr(_this.contentIntegration.GPRContent);
                    _this.setMemory(_this.contentIntegration.MEMContent);
                }
                // tslint:disable-next-line:no-empty
                while (_this.superescalar.tic() !== SuperescalarEnums_1.SuperescalarStatus.SUPER_ENDEXE) { }
                results.push(_this.superescalar.status.cycle);
            }
            var statistics = _this.calculateBatchStatistics(results);
            _this.clearBatchStateEffects();
            store_1.store.dispatch(modals_1.displayBatchResults(statistics));
        };
        _this.pause = function () {
            _this.stopCondition = main_consts_1.ExecutionStatus.PAUSE;
            _this.executing = false;
        };
        _this.stop = function () {
            if (!_this.superescalar.code) {
                return;
            }
            // In normal execution I have to avoid the asynchrnous way of
            // js entering in the interval, the only way I have is to using a semaphore
            _this.stopCondition = main_consts_1.ExecutionStatus.STOP;
            if (!_this.executing) {
                _this.executing = false;
                _this.resetMachine();
            }
        };
        _this.colorCell = function (instructionId, color) {
            _this.superescalar.reorderBuffer.elements.filter(function (e) { return e != null && e.instruction.id === +instructionId; })[0].instruction.color = color.hex;
            _this.superescalar.reserveStationEntry = _this.superescalar.reserveStationEntry.map(function (ree) { return ree.map(function (reserveStationEntry) {
                if (reserveStationEntry.instruction.id === +instructionId) {
                    reserveStationEntry.instruction.color = color.hex;
                }
                return reserveStationEntry;
            }); });
            _this.superescalar.functionalUnit = _this.superescalar.functionalUnit.map(function (functionalUnit) { return functionalUnit.map(function (fu) {
                fu.flow = fu.flow.map(function (instruction) {
                    if (instruction && instruction.id === +instructionId) {
                        instruction.color = color.hex;
                    }
                    return instruction;
                });
                return fu;
            }); });
            store_1.store.dispatch(actions_1.batchActions(actions_1.nextReorderBufferCycle(_this.superescalar.reorderBuffer.elements), actions_1.nextFunctionalUnitCycle(tslib_1.__spread(_this.superescalar.functionalUnit, [_this.superescalar.aluMem])), actions_1.nextReserveStationCycle([{
                    data: _this.superescalar.reserveStationEntry[0],
                    size: _this.superescalar.getReserveStationSize(0)
                },
                {
                    data: _this.superescalar.reserveStationEntry[1],
                    size: _this.superescalar.getReserveStationSize(1)
                },
                {
                    data: _this.superescalar.reserveStationEntry[2],
                    size: _this.superescalar.getReserveStationSize(2)
                },
                {
                    data: _this.superescalar.reserveStationEntry[3],
                    size: _this.superescalar.getReserveStationSize(3)
                },
                {
                    data: _this.superescalar.reserveStationEntry[4],
                    size: _this.superescalar.getReserveStationSize(4)
                },
                {
                    data: _this.superescalar.reserveStationEntry[5],
                    size: _this.superescalar.getReserveStationSize(5)
                }]), actions_1.colorCell(instructionId, color.hex)));
        };
        _this.stepBack = function () {
            // There is no time travelling for batch mode and initial mode
            if (_this.superescalar.status.cycle > 0 && _this.backStep < reducers_1.MAX_HISTORY_SIZE &&
                (_this.superescalar.status.cycle - _this.backStep > 0)) {
                _this.backStep++;
                store_1.store.dispatch(history_1.takeHistory(_this.backStep));
            }
        };
        _this.setMemory = function (data) {
            if (_this.superescalar.status.cycle > 0) {
                return;
            }
            Object.keys(data).forEach(function (key) {
                _this.superescalar.memory.setDatum(+key, data[key]);
            });
        };
        _this.setFpr = function (data) {
            if (_this.superescalar.status.cycle > 0) {
                return;
            }
            Object.keys(data).forEach(function (key) {
                _this.superescalar.fpr.setContent(+key, data[key], false);
            });
        };
        _this.setGpr = function (data) {
            if (_this.superescalar.status.cycle > 0) {
                return;
            }
            Object.keys(data).forEach(function (key) {
                _this.superescalar.gpr.setContent(+key, data[key], false);
            });
        };
        _this.executionLoop = function (speed) {
            if (!_this.stopCondition) {
                setTimeout(function () {
                    var machineStatus = _this.stepForward();
                    if (!(machineStatus === SuperescalarEnums_1.SuperescalarStatus.SUPER_BREAKPOINT || machineStatus === SuperescalarEnums_1.SuperescalarStatus.SUPER_ENDEXE)) {
                        _this.executionLoop(speed);
                    }
                    else {
                        if (machineStatus === SuperescalarEnums_1.SuperescalarStatus.SUPER_BREAKPOINT) {
                            alert(i18next_1.t('execution.stopped'));
                        }
                        else if (machineStatus === SuperescalarEnums_1.SuperescalarStatus.SUPER_ENDEXE) {
                            _this.finishedExecution = true;
                            alert(i18next_1.t('execution.finished'));
                        }
                    }
                }, speed);
            }
            else if (_this.stopCondition === main_consts_1.ExecutionStatus.STOP) {
                _this.resetMachine();
            }
        };
        _this.saveSuperConfig = function (superConfig) {
            // TODO: enforce this through a unique map so that we can overwrite the config directly
            _this.superescalar.setFunctionalUnitNumber(FunctionalUnit_1.FunctionalUnitType.INTEGERSUM, +superConfig["integerSumQuantity"]);
            _this.superescalar.setFunctionalUnitLatency(FunctionalUnit_1.FunctionalUnitType.INTEGERSUM, +superConfig["integerSumLatency"]);
            _this.superescalar.setFunctionalUnitNumber(FunctionalUnit_1.FunctionalUnitType.INTEGERMULTIPLY, +superConfig["integerMultQuantity"]);
            _this.superescalar.setFunctionalUnitLatency(FunctionalUnit_1.FunctionalUnitType.INTEGERMULTIPLY, +superConfig["integerMultLatency"]);
            _this.superescalar.setFunctionalUnitNumber(FunctionalUnit_1.FunctionalUnitType.FLOATINGSUM, +superConfig["floatingSumQuantity"]);
            _this.superescalar.setFunctionalUnitLatency(FunctionalUnit_1.FunctionalUnitType.FLOATINGSUM, +superConfig["floatingSumLatency"]);
            _this.superescalar.setFunctionalUnitNumber(FunctionalUnit_1.FunctionalUnitType.FLOATINGSUM, +superConfig["floatingSumQuantity"]);
            _this.superescalar.setFunctionalUnitLatency(FunctionalUnit_1.FunctionalUnitType.FLOATINGSUM, +superConfig["floatingSumLatency"]);
            _this.superescalar.setFunctionalUnitNumber(FunctionalUnit_1.FunctionalUnitType.FLOATINGMULTIPLY, +superConfig["floatingMultQuantity"]);
            _this.superescalar.setFunctionalUnitLatency(FunctionalUnit_1.FunctionalUnitType.FLOATINGMULTIPLY, +superConfig["floatingMultLatency"]);
            _this.superescalar.setFunctionalUnitNumber(FunctionalUnit_1.FunctionalUnitType.JUMP, +superConfig["jumpQuantity"]);
            _this.superescalar.setFunctionalUnitLatency(FunctionalUnit_1.FunctionalUnitType.JUMP, +superConfig["jumpLatency"]);
            _this.superescalar.setFunctionalUnitNumber(FunctionalUnit_1.FunctionalUnitType.MEMORY, +superConfig["memoryQuantity"]);
            _this.superescalar.setFunctionalUnitLatency(FunctionalUnit_1.FunctionalUnitType.MEMORY, +superConfig["memoryLatency"]);
            _this.superescalar.issue = +superConfig.issueGrade;
            _this.resetMachine();
        };
        _this.setBatchMode = function (replications, cacheFailLatency, cacheFailPercentage) {
            _this.replications = replications;
            _this.cacheFailLatency = cacheFailLatency;
            _this.cacheFailPercentage = cacheFailPercentage;
        };
        return _this;
    }
    SuperescalarIntegration.prototype.resetMachine = function () {
        var code = Object.assign(new Code_1.Code(), this.superescalar.code);
        this.superExe(true);
        this.superescalar.code = code;
        // Reload memory content
        if (this.contentIntegration) {
            this.setFpr(this.contentIntegration.FPRContent);
            this.setGpr(this.contentIntegration.GPRContent);
            this.setMemory(this.contentIntegration.MEMContent);
        }
        this.dispatchAllSuperescalarActions();
        store_1.store.dispatch(history_1.resetHistory());
    };
    SuperescalarIntegration.prototype.calculateBatchStatistics = function (results) {
        var average = (results.reduce(function (a, b) { return a + b; }) / results.length);
        return {
            replications: this.replications,
            average: average.toFixed(2),
            standardDeviation: this.calculateStandardDeviation(average, results).toFixed(2),
            worst: Math.max.apply(Math, tslib_1.__spread(results)),
            best: Math.min.apply(Math, tslib_1.__spread(results))
        };
    };
    SuperescalarIntegration.prototype.clearBatchStateEffects = function () {
        // Post launch machine clean
        this.superescalar.memory.failProbability = 0;
        this.superescalar.memoryFailLatency = 0;
        this.resetMachine();
    };
    return SuperescalarIntegration;
}(machine_integration_1.MachineIntegration));
exports.SuperescalarIntegration = SuperescalarIntegration;
exports.default = new SuperescalarIntegration();
//# sourceMappingURL=superescalar-integration.js.map