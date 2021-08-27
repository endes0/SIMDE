"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var actions_1 = require("../actions");
var modals_1 = require("../actions/modals");
var intervals_actions_1 = require("../actions/intervals-actions");
var interval_1 = require("../utils/interval");
var history_1 = require("../actions/history");
var Constants_1 = require("../../core/Constants");
var color_1 = require("./color");
var interval_2 = require("./interval");
var predicate_nat_actions_1 = require("../actions/predicate-nat-actions");
exports.MAX_HISTORY_SIZE = 10;
exports.PREDICATE_SIZE = 64;
exports.initialState = {
    prefetchUnit: [],
    decoder: [],
    jumpPrediction: [],
    history: [],
    functionalUnitIntAdd: {},
    functionalUnitIntSub: {},
    functionalUnitFloAdd: {},
    functionalUnitFloSub: {},
    functionalUnitMemory: {},
    functionalUnitJump: {},
    functionalUnitAluMem: {},
    reserveStationIntAdd: [],
    reserveStationIntSub: [],
    reserveStationFloAdd: [],
    reserveStationFloSub: [],
    reserveStationMemory: [],
    reserveStationJump: [],
    ROBGpr: {
        data: [],
        visibleRangeValues: interval_1.generateRangeArray(Constants_1.MACHINE_REGISTER_SIZE)
    },
    ROBFpr: {
        data: [],
        visibleRangeValues: interval_1.generateRangeArray(Constants_1.MACHINE_REGISTER_SIZE)
    },
    reorderBuffer: [],
    generalRegisters: {
        data: [],
        visibleRangeValues: interval_1.generateRangeArray(Constants_1.MACHINE_REGISTER_SIZE)
    },
    floatingRegisters: {
        data: [],
        visibleRangeValues: interval_1.generateRangeArray(Constants_1.MACHINE_REGISTER_SIZE)
    },
    memory: {
        data: [],
        visibleRangeValues: interval_1.generateRangeArray(Constants_1.MEMORY_SIZE)
    },
    predicate: {
        data: [],
        visibleRangeValues: interval_1.generateRangeArray(exports.PREDICATE_SIZE)
    },
    natGpr: {
        data: [],
        visibleRangeValues: interval_1.generateRangeArray(exports.PREDICATE_SIZE)
    },
    natFpr: {
        data: [],
        visibleRangeValues: interval_1.generateRangeArray(exports.PREDICATE_SIZE)
    },
    cycle: 0,
    code: [],
    vliwCode: [],
    vliwExecutionHeaderTable: [],
    vliwExecutionTable: [],
    colorBasicBlocks: false,
    isLoadModalOpen: false,
    isAuthorModalOpen: false,
    isOptionsModalOpen: false,
    isSuperConfigModalOpen: false,
    isVliwConfigModalOpen: false,
    isSuperescalarLoadContentModalOpen: false,
    isVliwLoadContentModalOpen: false,
    isBatchModalOpen: false,
    isBatchResultsModalOpen: false,
    batchResults: {}
};
function SuperescalarReducers(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case actions_1.NEXT_PREFETCH_CYCLE:
            return (state = tslib_1.__assign({}, state, { prefetchUnit: action.value }));
        case actions_1.NEXT_DECODER_CYCLE:
            return (state = tslib_1.__assign({}, state, { decoder: action.value }));
        case actions_1.NEXT_JUMP_TABLE_CYCLE:
            return (state = tslib_1.__assign({}, state, { jumpPrediction: action.value }));
        case actions_1.FUNCTIONAL_UNIT_CYCLE:
            return (state = tslib_1.__assign({}, state, { functionalUnitIntAdd: action.value[0], functionalUnitIntSub: action.value[1], functionalUnitFloAdd: action.value[2], functionalUnitFloSub: action.value[3], functionalUnitMemory: action.value[4], functionalUnitJump: action.value[5], functionalUnitAluMem: action.value[6] }));
        case actions_1.HEADER_TABLE_CYCLE:
            return (state = tslib_1.__assign({}, state, { vliwExecutionHeaderTable: action.value }));
        case actions_1.TABLE_CYCLE:
            return (state = tslib_1.__assign({}, state, { vliwExecutionTable: action.value }));
        case actions_1.NEXT_RESERVE_STATION_CYCLE:
            return (state = tslib_1.__assign({}, state, { reserveStationIntAdd: action.value[0], reserveStationIntSub: action.value[1], reserveStationFloAdd: action.value[2], reserveStationFloSub: action.value[3], reserveStationMemory: action.value[4], reserveStationJump: action.value[5] }));
        case actions_1.NEXT_REORDER_BUFFER_MAPPER_CYCLE:
            return (state = tslib_1.__assign({}, state, { ROBGpr: tslib_1.__assign({}, state.ROBGpr, { data: tslib_1.__spread(action.value[0]) }), ROBFpr: tslib_1.__assign({}, state.ROBFpr, { data: tslib_1.__spread(action.value[1]) }) }));
        case actions_1.NEXT_REORDER_BUFFER_CYCLE:
            return (state = tslib_1.__assign({}, state, { reorderBuffer: action.value }));
        case actions_1.NEXT_REGISTERS_CYCLE:
            return (state = tslib_1.__assign({}, state, { generalRegisters: tslib_1.__assign({}, state.generalRegisters, { data: tslib_1.__spread(action.value[0]) }), floatingRegisters: tslib_1.__assign({}, state.floatingRegisters, { data: tslib_1.__spread(action.value[1]) }) }));
        case actions_1.NEXT_MEMORY_CYCLE:
            return (state = tslib_1.__assign({}, state, { memory: tslib_1.__assign({}, state.memory, { data: action.value }) }));
        case actions_1.NEXT_CYCLE:
            return (state = tslib_1.__assign({}, state, { cycle: action.value }));
        case actions_1.SUPERESCALAR_LOAD:
            return (state = tslib_1.__assign({}, state, { code: action.value }));
        case modals_1.TOGGLE_LOAD_MODAL:
            return (state = tslib_1.__assign({}, state, { isLoadModalOpen: action.value }));
        case modals_1.TOGGLE_AUTHOR_MODAL:
            return (state = tslib_1.__assign({}, state, { isAuthorModalOpen: action.value }));
        case modals_1.TOGGLE_OPTIONS_MODAL:
            return (state = tslib_1.__assign({}, state, { isOptionsModalOpen: action.value }));
        case modals_1.TOGGLE_SUPER_CONFIG_MODAL:
            return (state = tslib_1.__assign({}, state, { isSuperConfigModalOpen: action.value }));
        case modals_1.TOGGLE_VLIW_CONFIG_MODAL:
            return (state = tslib_1.__assign({}, state, { isVliwConfigModalOpen: action.value }));
        case modals_1.TOGGLE_BATCH_MODAL:
            return (state = tslib_1.__assign({}, state, { isBatchModalOpen: action.value }));
        case modals_1.TOGGLE_SUPERESCALAR_LOAD_CONTENT_MODAL:
            return (state = tslib_1.__assign({}, state, { isSuperescalarLoadContentModalOpen: action.value }));
        case modals_1.TOGGLE_VLIW_LOAD_CONTENT_MODAL:
            return (state = tslib_1.__assign({}, state, { isVliwLoadContentModalOpen: action.value }));
        case actions_1.VIEW_BASIC_BLOCKS:
            return (state = tslib_1.__assign({}, state, { colorBasicBlocks: action.value }));
        case intervals_actions_1.ADD_ROB_FPR_INTERVAL:
            return interval_2.addInterval(state, 'ROBFpr', action.value);
        case intervals_actions_1.ADD_ROB_GPR_INTERVAL:
            return interval_2.addInterval(state, 'ROBGpr', action.value);
        case intervals_actions_1.REMOVE_ROB_FPR_INTERVAL:
            return interval_2.removeInterval(state, 'ROBFpr', action.value);
        case intervals_actions_1.REMOVE_ROB_GPR_INTERVAL:
            return interval_2.removeInterval(state, 'ROBGpr', action.value);
        case intervals_actions_1.ADD_MEMORY_INTERVAL:
            return interval_2.addInterval(state, 'memory', action.value);
        case intervals_actions_1.REMOVE_MEMORY_INTERVAL:
            return interval_2.removeInterval(state, 'memory', action.value);
        case intervals_actions_1.ADD_GENERAL_REGISTERS_INTERVAL:
            return interval_2.addInterval(state, 'generalRegisters', action.value);
        case intervals_actions_1.REMOVE_GENERAL_REGISTERS_INTERVAL:
            return interval_2.removeInterval(state, 'generalRegisters', action.value);
        case intervals_actions_1.ADD_FLOATING_REGISTERS_INTERVAL:
            return interval_2.addInterval(state, 'floatingRegisters', action.value);
        case intervals_actions_1.REMOVE_FLOATING_REGISTERS_INTERVAL:
            return interval_2.addInterval(state, 'floatingRegisters', action.value);
        case history_1.PUSH_HISTORY:
            return (state = tslib_1.__assign({}, state, { history: tslib_1.__spread(state.history, [
                    {
                        prefetchUnit: state.prefetchUnit,
                        decoder: state.decoder,
                        jumpPrediction: state.jumpPrediction,
                        functionalUnitIntAdd: state.functionalUnitIntAdd,
                        functionalUnitIntSub: state.functionalUnitIntSub,
                        functionalUnitFloAdd: state.functionalUnitFloAdd,
                        functionalUnitFloSub: state.functionalUnitFloSub,
                        functionalUnitMemory: state.functionalUnitMemory,
                        functionalUnitJump: state.functionalUnitJump,
                        functionalUnitAluMem: state.functionalUnitAluMem,
                        reserveStationIntAdd: state.reserveStationIntAdd,
                        reserveStationIntSub: state.reserveStationIntSub,
                        reserveStationFloAdd: state.reserveStationFloAdd,
                        reserveStationFloSub: state.reserveStationFloSub,
                        reserveStationMemory: state.reserveStationMemory,
                        reserveStationJump: state.reserveStationJump,
                        ROBGpr: tslib_1.__assign({}, state.ROBGpr),
                        ROBFpr: tslib_1.__assign({}, state.ROBFpr),
                        predicate: tslib_1.__assign({}, state.predicate),
                        NatGpr: tslib_1.__assign({}, state.natGpr),
                        NatFpr: tslib_1.__assign({}, state.natFpr),
                        reorderBuffer: state.reorderBuffer,
                        generalRegisters: state.generalRegisters,
                        floatingRegisters: state.floatingRegisters,
                        memory: state.memory,
                        cycle: state.cycle
                    }
                ]).slice(-exports.MAX_HISTORY_SIZE) }));
        case actions_1.COLOR_CELL:
            var newState = tslib_1.__assign({}, state);
            newState.history = color_1.colorHistoryInstruction(newState.history, action.value[0], action.value[1]);
            return newState;
        case history_1.TAKE_HISTORY:
            return (state = tslib_1.__assign({}, state, state.history[state.history.length - 1 - action.value]));
        case history_1.RESET_HISTORY:
            return (state = tslib_1.__assign({}, state, { history: [] }));
        case modals_1.DISPLAY_BATCH_RESULTS:
            return (state = tslib_1.__assign({}, state, { batchResults: action.value, isBatchResultsModalOpen: true }));
        case modals_1.CLEAR_BATCH_RESULTS:
            return (state = tslib_1.__assign({}, state, { batchResults: {}, isBatchResultsModalOpen: false }));
        case predicate_nat_actions_1.NEXT_NAT_FPR_CYCLE:
            return tslib_1.__assign({}, state, { natFpr: tslib_1.__assign({}, state.natFpr, { data: tslib_1.__spread(action.value) }) });
        case predicate_nat_actions_1.NEXT_NAT_GPR_CYCLE:
            return tslib_1.__assign({}, state, { natGpr: tslib_1.__assign({}, state.natGpr, { data: tslib_1.__spread(action.value) }) });
        case predicate_nat_actions_1.NEXT_PREDICATE_CYCLE:
            return tslib_1.__assign({}, state, { predicate: tslib_1.__assign({}, state.predicate, { data: tslib_1.__spread(action.value) }) });
        case predicate_nat_actions_1.ADD_NAT_FPR_INTERVAL:
            return interval_2.addInterval(state, 'NatFpr', action.value);
        case predicate_nat_actions_1.ADD_NAT_GPR_INTERVAL:
            return interval_2.addInterval(state, 'NatGpr', action.value);
        case predicate_nat_actions_1.ADD_PREDICATE_INTERVAL:
            return interval_2.addInterval(state, 'Predicate', action.value);
        case predicate_nat_actions_1.REMOVE_NAT_FPR_INTERVAL:
            return interval_2.removeInterval(state, 'NatFpr', action.value);
        case predicate_nat_actions_1.REMOVE_NAT_GPR_INTERVAL:
            return interval_2.removeInterval(state, 'NatGpr', action.value);
        case predicate_nat_actions_1.REMOVE_PREDICATE_INTERVAL:
            return interval_2.removeInterval(state, 'Predicate', action.value);
        default:
            return state;
    }
}
exports.SuperescalarReducers = SuperescalarReducers;
//# sourceMappingURL=index.js.map