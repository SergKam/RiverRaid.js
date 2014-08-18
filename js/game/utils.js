define(function () {
    return {
        mix: function mix(objTo, objFrom) {
            for (var key in objFrom) {
                if (objFrom.hasOwnProperty(key)) {
                    objTo[key] = objFrom[key];
                }
            }
        }

    }
});
