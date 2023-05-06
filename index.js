function throttle(f, ms) {
    let isThrottle = false,
        savedArgs,
        savedThis;

    function wrapper(...args) {
        if (isThrottle) {
            savedArgs = args;
            savedThis = this;

            return;
        }

        f.apply(this, args);

        isThrottle = true;

        setTimeout(() => {
            isThrottle = false;

            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms)
    }

    return wrapper
}

function f(a) {
    console.log(a)
}

// f1000 передаёт вызовы f максимум раз в 1000 мс
let f1000 = throttle(f, 1000);

f1000(1); // показывает 1
f1000(2); // (ограничение, 1000 мс ещё нет)
f1000(3); // (ограничение, 1000 мс ещё нет)