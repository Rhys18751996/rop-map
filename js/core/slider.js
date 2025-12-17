window.SliderController = (function () {

    const slider = document.getElementById('slider');

    const listEpisodes = [
        'Prologue',
        'Episode 1',
        'Episode 2',
        'Episode 3',
        'Episode 4',
        'Episode 5',
        'Episode 6',
        'Episode 7',
        'Episode 8'
    ];

    noUiSlider.create(slider, {
        start: [0, 8],
        connect: true,
        step: 1,
        range: { min: 0, max: 8 },
        pips: {
            mode: 'steps',
            density: 100,
            filter: () => 2,
            format: {
                to: value => listEpisodes[value],
                from: value => Number(value)
            }
        }
    });

    slider.noUiSlider.on('update', function (values) {
        window.timelineChange([Number(values[0]), Number(values[1])]);
    });

    // initialize timeline state AFTER slider exists
    window.timelineChange([0, 8]);

})();
