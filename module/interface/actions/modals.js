export var TOGGLE_LOAD_MODAL = 'TOGGLE_LOAD_MODAL';
export var TOGGLE_AUTHOR_MODAL = 'TOGGLE_AUTHOR_MODAL';
export var TOGGLE_INTERVAL_MODAL = 'TOGGLE_INTERVAL_MODAL';
export var TOGGLE_OPTIONS_MODAL = 'TOGGLE_OPTIONS_MODAL';
export var TOGGLE_SUPER_CONFIG_MODAL = 'TOGGLE_SUPER_CONFIG_MODAL';
export var TOGGLE_VLIW_CONFIG_MODAL = 'TOGGLE_VLIW_CONFIG_MODAL';
export var TOGGLE_BATCH_MODAL = 'TOGGLE_BATCH_MODAL';
export var TOGGLE_SUPERESCALAR_LOAD_CONTENT_MODAL = 'TOGGLE_SUPERESCALAR_LOAD_CONTENT_MODAL';
export var TOGGLE_VLIW_LOAD_CONTENT_MODAL = 'TOGGLE_VLIW_LOAD_CONTENT_MODAL';
export var DISPLAY_BATCH_RESULTS = 'DISPLAY_BATCH_RESULTS';
export var CLEAR_BATCH_RESULTS = 'CLEAR_BATCH_RESULTS';
export function toggleLoadModal(value) {
    return {
        type: TOGGLE_LOAD_MODAL,
        value: value
    };
}
export function toggleAuthorModal(value) {
    return {
        type: TOGGLE_AUTHOR_MODAL,
        value: value
    };
}
export function toggleIntervalModal(value) {
    return {
        type: TOGGLE_INTERVAL_MODAL,
        value: value
    };
}
export function toggleSuperescalarLoadContentModal(value) {
    return {
        type: TOGGLE_SUPERESCALAR_LOAD_CONTENT_MODAL,
        value: value
    };
}
export function toggleVliwLoadContentModal(value) {
    return {
        type: TOGGLE_VLIW_LOAD_CONTENT_MODAL,
        value: value
    };
}
export function toggleOptionsModal(value) {
    return {
        type: TOGGLE_OPTIONS_MODAL,
        value: value
    };
}
export function toggleSuperConfigModal(value) {
    return {
        type: TOGGLE_SUPER_CONFIG_MODAL,
        value: value
    };
}
export function toggleVliwConfigModal(value) {
    return {
        type: TOGGLE_VLIW_CONFIG_MODAL,
        value: value
    };
}
export function toggleBatchModal(value) {
    return {
        type: TOGGLE_BATCH_MODAL,
        value: value
    };
}
export function displayBatchResults(value) {
    return {
        type: DISPLAY_BATCH_RESULTS,
        value: value
    };
}
export function clearBatchResults(value) {
    return {
        type: CLEAR_BATCH_RESULTS,
        value: value
    };
}
//# sourceMappingURL=modals.js.map