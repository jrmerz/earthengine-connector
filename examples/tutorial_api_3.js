Map.addLayer(ee.Image('LC8_L1T/LC80440342014077LGN00'),
    {'min': 6000, 'max': 18000});
Map.setCenter(-122.44, 37.77, 12);

Map.addLayer(ee.Image('LC8_L1T/LC80440342014077LGN00'),
    {'min': 6000, 'max': 18000, 'bands': ['B4', 'B3', 'B2']});