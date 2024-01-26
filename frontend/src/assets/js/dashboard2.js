$(function()
{
    'use strict'
    $('#world-map-markers').mapael({
        map: {
            name: 'vietnam',
            zoom: {
                enabled: true,
                maxLevel: 10
            }
        },
        plots: {
            'hanoi': {
                latitude: 21.0285,
                longitude: 105.8542,
                tooltip: { content: 'Hanoi' }
            },
            'hochiminh': {
                latitude: 10.7769,
                longitude: 106.7009,
                tooltip: { content: 'Ho Chi Minh City' }
            }
            // Add more plots as needed
        }
    })
})