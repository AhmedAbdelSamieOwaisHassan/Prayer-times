

    let sityes = [
        {   
                arabicName: "الرياض",
                name: "Ar Riyāḑ",
                country: "SA", 
                timezone: "Asia/Riyadh"
        },

        { 
                arabicName: "مكة",
                name: "Makkah al Mukarramah",
                country: "SA",
                timezone: "Asia/Riyadh" 
                
        },
        { 
                arabicName: "السعودية",
                name: "saudia",
                country: "SA",
                timezone: "Asia/Riyadh"
            
            },
        { 
                arabicName: "مصر",
                name: "EGYPT",
                country: "EG",
                timezone: "Africa/Cairo" 
            },
        { 
                arabicName: "الجزائر",
                name: "algeria",
                country: "DZ",
                timezone: "Africa/Algiers" 
            
            },
        { 
                arabicName: "قطر",
                name: "QATAR", 
                country: "QA",
                timezone: "Asia/Qatar" 
            
            },
        { 
                arabicName: "المغرب",
                name: "Morocco",
                country: "MA",
                timezone: "Africa/Casablanca" 
            },
        { 
                arabicName: "تونس",
                name: "TUNIS",
                country: "TN",
                timezone: "Africa/Tunis" 
            },
        { 
                arabicName: "ليبيا",
                name: "Libya",
                country: "LY",
                timezone: "Africa/Tripoli" 
            },
        { 
                arabicName: "التنسيلة",
                name: "Tunisia",
                country: "TN",
                timezone: "Africa/Tunis" 
            },
        { 
                arabicName: "السودان",
                name: "Sudan",
                country: "SD",
                timezone: "Africa/Khartoum" 
            },
        { 
                arabicName: "السودان الجنوبية",
                name: "South Sudan",
                country: "SS",
                timezone: "Africa/Juba" 
            },
        { 
                arabicName: "العراق",
                name: "Iraq",
                country: "IQ",
                timezone: "Asia/Baghdad" 
            },
            {
                arabicName: "الكويت",
                name: "Kuwait",
                country: "KW",
                timezone: "Asia/Kuwait"
            },
            {
                arabicName: "البحرين",
                name: "Bahrain",
                country: "BH",
                timezone: "Asia/Bahrain"
            },
            {
                arabicName: "الامارات",
                name: "United Arab Emirates",
                country: "AE",
                timezone: "Asia/Dubai"
            },
            

    ];

            for (let city of sityes) {
                const content = `<option value="${city.name}">${city.arabicName}</option>`;
                document.getElementById("city1").innerHTML += content;
            }

            document.getElementById("city1").addEventListener("change", function () {
                let selectedName = this.value;
                let cityObj = sityes.find(city => city.name === selectedName);
                document.getElementById("from").innerHTML = cityObj ? cityObj.arabicName : "";
                if (cityObj) {
                    getPrayersTime(cityObj.name, cityObj.country);
                    showCityTime(cityObj.timezone);
                }
            });

            function showCityTime(timezone) {
                if (!timezone) return;
                const now = new Date();
                const options = { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit', 
                    hour12: false, 
                    timeZone: timezone 
                };
                const timeString = new Intl.DateTimeFormat('ar-EG', options).format(now);
                document.getElementById("city-time").innerHTML = `الساعة الآن: ${timeString} | ${timezone}`;
            }

            //  لما الصفحة  تحميل  اعرض الوقت الافتراضي
            let defaultCity = sityes.find(city => city.name === "EGYPT");
            if (defaultCity) {
                getPrayersTime(defaultCity.name, defaultCity.country);
                showCityTime(defaultCity.timezone);
            }

            function getPrayersTime(city, country = "SA") {
                let province = {
                    address: city,
                    country: country,
                    method: "city"
                };

                axios.get('https://api.aladhan.com/v1/timingsByAddress', {
                    params: province
                })
                    .then(function (response) {
                        let timings = response.data.data.timings;
                        fallTimeForPrayer("fajr-Time", timings.Fajr);
                        fallTimeForPrayer("shorok-time", timings.Sunrise);
                        fallTimeForPrayer("dhurh-time", timings.Dhuhr);
                        fallTimeForPrayer("asr-time", timings.Asr);
                        fallTimeForPrayer("maghrib-time", timings.Maghrib);
                        fallTimeForPrayer("isha-time", timings.Isha);
                        let readableDate = response.data.data.date.readable;
                        let weekday = response.data.data.date.hijri.weekday.ar;
                        let date = readableDate + " /" + weekday;
                        document.getElementById("date").innerHTML = date;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            function fallTimeForPrayer(id, time) {
                document.getElementById(id).innerHTML = time;
            }