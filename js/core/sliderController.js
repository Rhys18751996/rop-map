window.SliderController = (function () {

    const slider = document.getElementById('slider');

    // List of default episode names (optional)
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

    // Initialize the slider once
    noUiSlider.create(slider, {
        start: [0, listEpisodes.length - 1],
        connect: true,
        step: 1,
        range: { min: 0, max: listEpisodes.length - 1 },
        pips: {
            mode: 'steps',
            density: 100,
            filter: () => 2,
            format: {
                to: value => listEpisodes[value] || `Episode ${value}`,
                from: value => Number(value)
            }
        }
    });

    slider.noUiSlider.on('update', function (values) {
        window.timelineChange([Number(values[0]), Number(values[1])]);
    });

    // initialize timeline state AFTER slider exists
    window.timelineChange([0, listEpisodes.length - 1]);

    // Function to dynamically update slider range when season changes
    function updateSlider(episodeCount) {
        slider.noUiSlider.updateOptions({
            range: { min: 0, max: episodeCount },
            start: [0, episodeCount],
            pips: {
                mode: 'steps',
                density: 100,
                filter: () => 2,
                format: {
                    to: value => `Episode ${value}`,
                    from: value => Number(value)
                }
            }
        });
        window.timelineChange([0, episodeCount]);
    }

    return { updateSlider };

})();