import * as tslib_1 from "tslib";
import { ExecutionStatus } from '../main-consts';
import { store } from '../store';
import { nextFunctionalUnitCycle, nextVLIWHeaderTableCycle, nextVLIWExecutionTableCycle, nextRegistersCycle, nextMemoryCycle, nextCycle, superescalarLoad, batchActions } from '../interface/actions';
import { pushHistory, takeHistory, resetHistory } from '../interface/actions/history';
import { MAX_HISTORY_SIZE } from '../interface/reducers';
import { t } from 'i18next';
import { MachineIntegration } from './machine-integration';
import { VLIW, VLIWCode, VLIWError } from '../core/VLIW';
import { nextNatFprCycle, nextNatGprCycle, nextPredicateCycle } from '../interface/actions/predicate-nat-actions';
import { displayBatchResults } from '../interface/actions/modals';
var VLIWIntegration = /** @class */ (function (_super) {
    tslib_1.__extends(VLIWIntegration, _super);
    function VLIWIntegration() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Global objects for binding React to the View
        _this.vliw = new VLIW();
        _this.codeLoaded = false;
        _this.interval = null;
        _this.backStep = 0;
        _this.stopCondition = ExecutionStatus.EXECUTABLE;
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
        _this.dispatchAllVLIWActions = function (step) {
            // Code should only be setted on the first iteration
            store.dispatch(batchActions(nextFunctionalUnitCycle(tslib_1.__spread(_this.vliw.functionalUnit)), nextVLIWHeaderTableCycle(_this.vliw._functionalUnitNumbers), nextVLIWExecutionTableCycle(_this.vliw.code.instructions, _this.vliw._functionalUnitNumbers), nextRegistersCycle([_this.vliw.gpr.content, _this.vliw.fpr.content]), nextMemoryCycle(_this.vliw.memory.data), nextCycle(_this.vliw.status.cycle), nextNatFprCycle(_this.vliw.getNaTFP()), nextNatGprCycle(_this.vliw.getNaTGP()), nextPredicateCycle(_this.vliw.getPredReg()), pushHistory()));
        };
        _this.vliwExe = function () {
            _this.vliw.init(true);
        };
        _this.stepForward = function () {
            if (!_this.vliw.code) {
                return;
            }
            if (_this.backStep > 0) {
                _this.backStep--;
                store.dispatch(takeHistory(_this.backStep));
            }
            else {
                if (_this.finishedExecution) {
                    _this.finishedExecution = false;
                    var code = Object.assign(new VLIWCode(), _this.vliw.code);
                    _this.vliwExe();
                    _this.vliw.code = code;
                    // Load memory content
                    if (_this.contentIntegration) {
                        _this.setFpr(_this.contentIntegration.FPRContent);
                        _this.setGpr(_this.contentIntegration.GPRContent);
                        _this.setMemory(_this.contentIntegration.MEMContent);
                    }
                }
                var machineStatus = _this.vliw.tic();
                _this.dispatchAllVLIWActions();
                return machineStatus;
            }
        };
        _this.loadCode = function (vliwCode) {
            _this.vliw.code = vliwCode;
            _this.resetMachine();
            // There is no need to update the code with the rest,
            // it should remain the same during all the program execution
            store.dispatch(nextVLIWHeaderTableCycle(_this.vliw._functionalUnitNumbers));
            store.dispatch(nextVLIWExecutionTableCycle(_this.vliw.code.instructions, _this.vliw._functionalUnitNumbers));
            store.dispatch(superescalarLoad(vliwCode.superescalarCode.instructions));
        };
        _this.play = function () {
            if (!_this.vliw.code) {
                return;
            }
            _this.stopCondition = ExecutionStatus.EXECUTABLE;
            _this.backStep = 0;
            _this.executing = true;
            var speed = _this.calculateSpeed();
            if (_this.finishedExecution) {
                _this.finishedExecution = false;
                var code = Object.assign(new VLIWCode(), _this.vliw.code); // asignar tambien el codigo superescalar?
                _this.vliwExe();
                _this.vliw.code = code;
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
                while (_this.vliw.tic() !== VLIWError.ENDEXE) { }
                _this.dispatchAllVLIWActions();
                _this.finishedExecution = true;
                alert(t('execution.finished'));
            }
        };
        _this.makeBatchExecution = function () {
            if (!_this.vliw.code) {
                return;
            }
            var results = [];
            for (var i = 0; i < _this.replications; i++) {
                var code = Object.assign(new VLIWCode(), _this.vliw.code);
                _this.vliwExe();
                _this.vliw.code = code;
                _this.vliw.memory.failProbability = _this.cacheFailPercentage;
                _this.vliw.memoryFailLatency = _this.cacheFailLatency;
                // Load memory content
                if (_this.contentIntegration) {
                    _this.setFpr(_this.contentIntegration.FPRContent);
                    _this.setGpr(_this.contentIntegration.GPRContent);
                    _this.setMemory(_this.contentIntegration.MEMContent);
                }
                // tslint:disable-next-line:no-empty
                while (_this.vliw.tic() !== VLIWError.ENDEXE) { }
                results.push(_this.vliw.status.cycle);
            }
            var statistics = _this.calculateBatchStatistics(results);
            _this.clearBatchStateEffects();
            store.dispatch(displayBatchResults(statistics));
        };
        _this.pause = function () {
            _this.stopCondition = ExecutionStatus.PAUSE;
            _this.executing = false;
        };
        _this.stop = function () {
            if (!_this.vliw.code) {
                return;
            }
            // In normal execution I have to avoid the asynchrnous way of
            // js entering in the interval, the only way I have is to using a semaphore
            _this.stopCondition = ExecutionStatus.STOP;
            if (!_this.executing) {
                _this.executing = false;
                _this.resetMachine();
            }
        };
        _this.stepBack = function () {
            // There is no time travelling for batch mode and initial mode
            if (_this.vliw.status.cycle > 0 && _this.backStep < MAX_HISTORY_SIZE &&
                (_this.vliw.status.cycle - _this.backStep > 0)) {
                _this.backStep++;
                store.dispatch(takeHistory(_this.backStep));
            }
        };
        _this.setMemory = function (data) {
            if (_this.vliw.status.cycle > 0) {
                return;
            }
            Object.keys(data).forEach(function (key) {
                _this.vliw.memory.setDatum(+key, data[key]);
            });
        };
        _this.setFpr = function (data) {
            if (_this.vliw.status.cycle > 0) {
                return;
            }
            Object.keys(data).forEach(function (key) {
                _this.vliw.fpr.setContent(+key, data[key], false);
            });
        };
        _this.setGpr = function (data) {
            if (_this.vliw.status.cycle > 0) {
                return;
            }
            Object.keys(data).forEach(function (key) {
                _this.vliw.gpr.setContent(+key, data[key], false);
            });
        };
        _this.executionLoop = function (speed) {
            if (!_this.stopCondition) {
                setTimeout(function () {
                    var machineStatus = _this.stepForward();
                    if (!(machineStatus === VLIWError.BREAKPOINT || machineStatus === VLIWError.ENDEXE)) {
                        _this.executionLoop(speed);
                    }
                    else {
                        if (machineStatus === VLIWError.BREAKPOINT) {
                            alert(t('execution.stopped'));
                        }
                        else if (machineStatus === VLIWError.ENDEXE) {
                            _this.finishedExecution = true;
                            alert(t('execution.finished'));
                        }
                    }
                }, speed);
            }
            else if (_this.stopCondition === ExecutionStatus.STOP) {
                _this.resetMachine();
            }
        };
        _this.saveVliwConfig = function (vliwConfig) {
            var vliwConfigKeys = Object.keys(vliwConfig);
            for (var i = 0; i < vliwConfigKeys.length; i++) {
                if (i % 2 === 0) {
                    _this.vliw.setFunctionalUnitNumber(i / 2, +vliwConfig[vliwConfigKeys[i]]);
                }
                else {
                    _this.vliw.setFunctionalUnitLatency(i / 2, +vliwConfig[vliwConfigKeys[i]]);
                }
            }
        };
        _this.setBatchMode = function (replications, cacheFailLatency, cacheFailPercentage) {
            _this.replications = replications;
            _this.cacheFailLatency = cacheFailLatency;
            _this.cacheFailPercentage = cacheFailPercentage;
        };
        return _this;
    }
    VLIWIntegration.prototype.resetMachine = function () {
        var code = Object.assign(new VLIWCode(), this.vliw.code);
        this.vliwExe();
        this.vliw.code = code;
        // Reload memory content
        if (this.contentIntegration) {
            this.setFpr(this.contentIntegration.FPRContent);
            this.setGpr(this.contentIntegration.GPRContent);
            this.setMemory(this.contentIntegration.MEMContent);
        }
        this.dispatchAllVLIWActions();
        store.dispatch(resetHistory());
    };
    VLIWIntegration.prototype.calculateBatchStatistics = function (results) {
        var average = (results.reduce(function (a, b) { return a + b; }) / results.length);
        return {
            replications: this.replications,
            average: average.toFixed(2),
            standardDeviation: this.calculateStandardDeviation(average, results).toFixed(2),
            worst: Math.max.apply(Math, tslib_1.__spread(results)),
            best: Math.min.apply(Math, tslib_1.__spread(results))
        };
    };
    VLIWIntegration.prototype.clearBatchStateEffects = function () {
        // Post launch machine clean
        this.vliw.memory.failProbability = 0;
        this.vliw.memoryFailLatency = 0;
        this.resetMachine();
    };
    return VLIWIntegration;
}(MachineIntegration));
export { VLIWIntegration };
export default new VLIWIntegration();
//# sourceMappingURL=vliw-integration.js.map