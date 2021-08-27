"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MACHINE_REGISTER_SIZE = 64;
exports.MEMORY_SIZE = 1024;
exports.SUPERESCALAR_CONFIG = {
    FUNCTIONAL_UNIT_MIN: 1,
    FUNCTIONAL_UNIT_MAX: 10,
    LATENCY_MIN: 0,
    LATENCY_MAX: 100,
    ISSUE_GRADE_MIN: 1,
    ISSUE_GRADE_MAX: 16
};
exports.VLIW_CONFIG = {
    FUNCTIONAL_UNIT_MIN: 1,
    FUNCTIONAL_UNIT_MAX: 10,
    LATENCY_MIN: 0,
    LATENCY_MAX: 100,
    ISSUE_GRADE_MIN: 1,
    ISSUE_GRADE_MAX: 16
};
exports.BATCH_CONFIG = {
    LATENCY_MIN: 0,
    LATENCY_MAX: 100,
    CACHE_FAIL_PERCENTAGE_MIN: 0,
    CACHE_FAIL_PERCENTAGE_MAX: 100
};
//# sourceMappingURL=index.js.map