"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOGGLE_LOAD_MODAL = 'TOGGLE_LOAD_MODAL';
exports.TOGGLE_AUTHOR_MODAL = 'TOGGLE_AUTHOR_MODAL';
exports.TOGGLE_INTERVAL_MODAL = 'TOGGLE_INTERVAL_MODAL';
exports.TOGGLE_OPTIONS_MODAL = 'TOGGLE_OPTIONS_MODAL';
exports.TOGGLE_SUPER_CONFIG_MODAL = 'TOGGLE_SUPER_CONFIG_MODAL';
exports.TOGGLE_VLIW_CONFIG_MODAL = 'TOGGLE_VLIW_CONFIG_MODAL';
exports.TOGGLE_BATCH_MODAL = 'TOGGLE_BATCH_MODAL';
exports.TOGGLE_SUPERESCALAR_LOAD_CONTENT_MODAL = 'TOGGLE_SUPERESCALAR_LOAD_CONTENT_MODAL';
exports.TOGGLE_VLIW_LOAD_CONTENT_MODAL = 'TOGGLE_VLIW_LOAD_CONTENT_MODAL';
exports.DISPLAY_BATCH_RESULTS = 'DISPLAY_BATCH_RESULTS';
exports.CLEAR_BATCH_RESULTS = 'CLEAR_BATCH_RESULTS';
function toggleLoadModal(value) {
    return {
        type: exports.TOGGLE_LOAD_MODAL,
        value: value
    };
}
exports.toggleLoadModal = toggleLoadModal;
function toggleAuthorModal(value) {
    return {
        type: exports.TOGGLE_AUTHOR_MODAL,
        value: value
    };
}
exports.toggleAuthorModal = toggleAuthorModal;
function toggleIntervalModal(value) {
    return {
        type: exports.TOGGLE_INTERVAL_MODAL,
        value: value
    };
}
exports.toggleIntervalModal = toggleIntervalModal;
function toggleSuperescalarLoadContentModal(value) {
    return {
        type: exports.TOGGLE_SUPERESCALAR_LOAD_CONTENT_MODAL,
        value: value
    };
}
exports.toggleSuperescalarLoadContentModal = toggleSuperescalarLoadContentModal;
function toggleVliwLoadContentModal(value) {
    return {
        type: exports.TOGGLE_VLIW_LOAD_CONTENT_MODAL,
        value: value
    };
}
exports.toggleVliwLoadContentModal = toggleVliwLoadContentModal;
function toggleOptionsModal(value) {
    return {
        type: exports.TOGGLE_OPTIONS_MODAL,
        value: value
    };
}
exports.toggleOptionsModal = toggleOptionsModal;
function toggleSuperConfigModal(value) {
    return {
        type: exports.TOGGLE_SUPER_CONFIG_MODAL,
        value: value
    };
}
exports.toggleSuperConfigModal = toggleSuperConfigModal;
function toggleVliwConfigModal(value) {
    return {
        type: exports.TOGGLE_VLIW_CONFIG_MODAL,
        value: value
    };
}
exports.toggleVliwConfigModal = toggleVliwConfigModal;
function toggleBatchModal(value) {
    return {
        type: exports.TOGGLE_BATCH_MODAL,
        value: value
    };
}
exports.toggleBatchModal = toggleBatchModal;
function displayBatchResults(value) {
    return {
        type: exports.DISPLAY_BATCH_RESULTS,
        value: value
    };
}
exports.displayBatchResults = displayBatchResults;
function clearBatchResults(value) {
    return {
        type: exports.CLEAR_BATCH_RESULTS,
        value: value
    };
}
exports.clearBatchResults = clearBatchResults;
//# sourceMappingURL=modals.js.map