var chartGyroXYZ = new Highcharts.stockChart({
    chart: {
        renderTo: 'gyroXYZ'
    },
    title: {
        text: 'IMU GyroXYZ'
    },
    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'second',
            text: '1s'
        }, {
            count: 5,
            type: 'second',
            text: '5s'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false,
        selected: 1
    },
    series: [{
            name: 'X',
            type: 'spline',
            data: []
        }, {
            name: 'Y',
            type: 'spline',
            data: []
        },
        {
            name: 'Z',
            type: 'spline',
            data: []
        }
    ],
    legend: {
        enabled: true
    },
    plotOptions: {
        spline: {
            animation: true,
            dataLabels: {
                enabled: true
            }
        }
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            second: '%H:%M:%S'
        }
    },
    credits: {
        enabled: false
    }
});

var chartAccXYZ = new Highcharts.stockChart({
    chart: {
        renderTo: 'accXYZ'
    },
    title: {
        text: 'IMU AccXYZ'
    },
    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'second',
            text: '1s'
        }, {
            count: 5,
            type: 'second',
            text: '5s'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false,
        selected: 1
    },
    series: [{
            name: 'X',
            type: 'spline',
            data: []
        }, {
            name: 'Y',
            type: 'spline',
            data: []
        },
        {
            name: 'Z',
            type: 'spline',
            data: []
        }
    ],
    legend: {
        enabled: true
    },
    plotOptions: {
        spline: {
            animation: true,
            dataLabels: {
                enabled: true
            }
        }
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            second: '%H:%M:%S'
        }
    },
    credits: {
        enabled: false
    }
});

var chartAhrsPRY = new Highcharts.stockChart({
    chart: {
        renderTo: 'ahrsPRY'
    },
    title: {
        text: 'IMU AhrsPRY'
    },
    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'second',
            text: '1s'
        }, {
            count: 5,
            type: 'second',
            text: '5s'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false,
        selected: 1
    },
    series: [{
            name: 'Pitch',
            type: 'spline',
            data: []
        }, {
            name: 'Roll',
            type: 'spline',
            data: []
        },
        {
            name: 'Yaw',
            type: 'spline',
            data: []
        }
    ],
    legend: {
        enabled: true
    },
    plotOptions: {
        spline: {
            animation: true,
            dataLabels: {
                enabled: true
            }
        }
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            second: '%H:%M:%S'
        }
    },
    credits: {
        enabled: false
    }
});

setInterval(function () {
    //var imuElement = document.getElementById("imu");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var imuResponse = JSON.parse(this.responseText);
            var x = (new Date()).getTime();

            var gyroX = parseFloat(imuResponse.gyro[0]);
            var gyroY = parseFloat(imuResponse.gyro[1]);
            var gyroZ = parseFloat(imuResponse.gyro[2]);

            var accX = parseFloat(imuResponse.accel[0]);
            var accY = parseFloat(imuResponse.accel[1]);
            var accZ = parseFloat(imuResponse.accel[2]);

            var ahrsP = parseFloat(imuResponse.ahrs[0]);
            var ahrsR = parseFloat(imuResponse.ahrs[1]);
            var ahrsY = parseFloat(imuResponse.ahrs[2]);

            chartGyroXYZ.series[0].addPoint([x, gyroX]);
            chartGyroXYZ.series[1].addPoint([x, gyroY]);
            chartGyroXYZ.series[2].addPoint([x, gyroZ]);

            chartAccXYZ.series[0].addPoint([x, accX]);
            chartAccXYZ.series[1].addPoint([x, accY]);
            chartAccXYZ.series[2].addPoint([x, accZ]);

            chartAhrsPRY.series[0].addPoint([x, ahrsP]);
            chartAhrsPRY.series[1].addPoint([x, ahrsR]);
            chartAhrsPRY.series[2].addPoint([x, ahrsY]);
        }
    };
    xhttp.open("GET", "/imu", true);
    xhttp.send();
}, 100);