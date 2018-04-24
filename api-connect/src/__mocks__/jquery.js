export default {
    ajax(xhr) { return this },
    done(fn) {
        if (fn) fn();
        return this;
    },
    fail(fn) {
        if (fn) fn();
        return this;
    },
    get: jest.fn(()=> Promise.resolve({}))
};