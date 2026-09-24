// 1. نظام التنقل بين الصفحات (SPA Routing)
function switchPage(pageId) {
  // إخفاء جميع الأقسام
  document.getElementById("page-home").style.display = "none";
  document.getElementById("page-parents").style.display = "none";
  document.getElementById("page-kids").style.display = "none";
  document.getElementById("page-centers").style.display = "none";

  // إزالة التنشيط من جميع روابط القائمة العلوية
  document.getElementById("nav-home").classList.remove("active", "fw-bold");
  document.getElementById("nav-parents").classList.remove("active", "fw-bold");
  document.getElementById("nav-kids").classList.remove("active", "fw-bold");
  document.getElementById("nav-centers").classList.remove("active", "fw-bold");

  // إظهار القسم المطلوب وتنشيط الرابط الخاص به
  document.getElementById("page-" + pageId).style.display = "block";
  document.getElementById("nav-" + pageId).classList.add("active", "fw-bold");

  // الصعود لأعلى الصفحة بسلاسة
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// 2. دالة عرض المقالات
const articleModalElement = document.getElementById("articleModal");
const articleModal = new bootstrap.Modal(articleModalElement);
function showArticle(title, content) {
  document.getElementById("articleModalLabel").innerText = title;
  document.getElementById("articleModalBody").innerHTML = content;
  articleModal.show();
}

// 3. دالة عرض الفيديوهات
const videoModalElement = document.getElementById("videoModal");
const videoModal = new bootstrap.Modal(videoModalElement);
const videoPlayer = document.getElementById("modalVideoPlayer");

function openVideoModal(title, videoUrl) {
  document.getElementById("videoModalLabel").innerText = title;
  videoPlayer.src = encodeURI(videoUrl);
  videoPlayer.load();
  videoModal.show();

  setTimeout(() => {
    videoPlayer.play().catch((error) => {
      console.log("المتصفح منع التشغيل التلقائي: ", error);
    });
  }, 200);
}

videoModalElement.addEventListener("hidden.bs.modal", function () {
  videoPlayer.pause();
  videoPlayer.src = "";
});

// 4. قاعدة البيانات ودالة المراكز
const centersData = {
  cairo: [
    {
      name: "مركز مصر للسمع والتاهيل",
      address: "الزمالك، القاهرة",
      phone: "01274099903",
    },
    {
      name: "Golf Egypt Audiology Rahab center",
      address: "وسط البلد، القاهرة",
      phone: "01140001215",
    },
    {
      name: "مركز سمعيات (فرع البساتين)",
      address: "البساتين، القاهرة",
      phone: "01274099885",
    },
  ],
  giza: [
    {
      name: "مركز السماعيات الطبية",
      address: "الدقي، الجيزة",
      phone: "01274099905",
    },
    {
      name: "مركز Hear life لسماعات الاذن",
      address: "المهندسين، الجيزة",
      phone: "01016034442",
    },
    {
      name: "مركز مصر للسمع والتاهيل (فرع الجيزة)",
      address: "شارع الهرم، الجيزة",
      phone: "0127409990",
    },
    {
      name: "مركز الصفوة للسمعيات",
      address: "فيصل، الجيزة",
      phone: "01154983333",
    },
  ],
  sharqia: [
    {
      name: "مركز مصر للسمع والتاهيل (فرع الزقازيق)",
      address: "الزقازيق، الشرقية",
      phone: "01274099904",
    },
    {
      name: "مركز الصفوة للسمعيات",
      address: "العاشر من رمضان، الشرقية",
      phone: "01154984444",
    },
    {
      name: "مركز Hear well للسمعيات",
      address: "بلبيس، الشرقية",
      phone: "01016035553",
    },
    {
      name: "مركز الحياه للسمع وسماعات الاذن",
      address: "منيا القمح، الشرقية",
      phone: "01222334455",
    },
  ],
  ismailia: [
    {
      name: "مركز السمع والاتزان (د. مصطفى كامل)",
      address: "حي التمساح، الإسماعيلية",
      phone: "عيادة خاصة - يفضل الحجز مسبقاً",
    },
    {
      name: "وايدكس إيجيبت الإسماعيلية",
      address: "شارع الحرية - حي أول، الإسماعيلية",
      phone: "01285221535",
    },
    {
      name: "Pro Sound",
      address: "حي التمساح، الإسماعيلية",
      phone: "01212696492",
    },
  ],
  dakahlia: [
    {
      name: "Opera Hearing Solution",
      address: "١٣ شارع بنك مصر، المنصورة",
      phone: "01200084874",
    },
    {
      name: "صيانه سماعات مرضي ضعاف السمع",
      address: "أبو الدبل، الدقهلية",
      phone: "01003723882",
    },
    {
      name: "El Amal Hearing Aid Center",
      address: "شارع الجيش، داخل مستشفى الصفا التخصصي (ميت غمر)",
      phone: "التواصل مع العيادة مباشرة",
    },
    {
      name: "Pure Sound for Hearing Aids",
      address: "المنصورة",
      phone: "01004502335",
    },
  ],
  assiut: [
    {
      name: "شركة النهار التجارية للسمعيات",
      address: "ميدان المحطة، برج خالد بن الوليد، أسيوط",
      phone: "01026681664",
    },
    {
      name: "طب السمع والاتزان Audio Doctor Clinic",
      address: "الحمراء التانية، الفتح، أسيوط",
      phone: "يفضل الاستعلام عند الاتصال",
    },
    {
      name: "عيادة د. إيمان عبد الفتاح الجندي",
      address: "امتداد سيري راغب، قريب من الحمراء، أسيوط",
      phone: "الحجز عبر العيادات أو فيزيتا",
    },
    {
      name: "عيادة د. ايناس محمد",
      address: "منطقة ميدان المحطة، أسيوط",
      phone: "01015457636",
    },
  ],
  damietta: [
    {
      name: "مركز هيرو ميديكال للمستلزمات الطبية",
      address: "قسم دمياط، دمياط",
      phone: "01226404001",
    },
    {
      name: "مركز المعداوى ميديكال للمستلزمات الطبية",
      address: "متفرع من شارع الجلاء، مقابل صرافة البنك الاهلي، دمياط",
      phone: "01092278187",
    },
    {
      name: "مركز كسيبه السماعات الطبية",
      address: "أمام الإسكندرية، ميدان الشهابية، دمياط",
      phone: "01098243650",
    },
    {
      name: "عيادة د. سارة عبده زقزوق للسمع والاتزان",
      address: "باب الحرس، شارع محمد عبده، بجوار صيدلية مكه، دمياط",
      phone: "01227043544",
    },
  ],
  fayoum: [
    {
      name: "مركز نايل فور للسمعيات",
      address: "شارع ابو بكر الصديق، الفيوم",
      phone: "01002809135",
    },
    {
      name: "مركز إيرتك للسمعيات",
      address: "أمام مستشفي الندى، شارع النبوى المهندس، الفيوم",
      phone: "01003747287",
    },
    {
      name: "مركز أمبليفون للسمعيات",
      address: "شارع جمال عبد الناصر، بجوار مطعم أم حسن، الفيوم",
      phone: "0842031476",
    },
  ],
  sohag: [
    {
      name: "مركز المصطفي للسمع والاتزان",
      address: "شارع المحطة، برج المدينه المنورة، سوهاج",
      phone: "01064464744",
    },
    {
      name: "عيادة د. محمد وائل",
      address: "شارع التحرير، أمام النجدة، برج الري، سوهاج",
      phone: "01153881709",
    },
    {
      name: "مركز عالمي Amplifon للسماعات",
      address: "شارع عباد الرحمن متفرع من شارع التحرير، سوهاج",
      phone: "01220449779",
    },
    {
      name: "ميركل للسماعات الطبية لضعاف السمع",
      address: "شارع البحر، برج الخضيري، سوهاج",
      phone: "01203464692",
    },
  ],
  luxor: [
    {
      name: "عيادة د. علي عبد المجيد ابو سحلي",
      address: "أمام المستشفي الدولي، شارع التليفزيون، الأقصر",
      phone: "01121140466",
    },
    {
      name: "عيادة د. هشام صبري",
      address: "ميدان صلاح الدين، الأقصر",
      phone: "01009038001",
    },
    {
      name: "مركز النيل الطبي",
      address: "شارع الروضة الشريفة، الأقصر",
      phone: "01222230383",
    },
  ],
  aswan: [
    {
      name: "Amplifon فرع لخدمات السمع",
      address: "ميدان الطابية، خلف سيتي سنترمول، شارع بندر، أسوان",
      phone: "+81592449720",
    },
    {
      name: "عيادة قياس السمع / مستشفي",
      address: "شارع الشواربي، أسوان",
      phone: "+356703612720",
    },
    {
      name: "مركز مناظير الأنف والاذن والحنجرة",
      address: "إدفو، مركز إدفو، أسوان",
      phone: "+69449260111",
    },
  ],
  redsea: [
    {
      name: "بيورفون سماعات طبية",
      address: "الغردقة، البحر الأحمر",
      phone: "+487065515520",
    },
    {
      name: "د. ألبرت اسكندر مرجان",
      address: "Royal Hospital Hurghada، الغردقة",
      phone: "التواصل مع المستشفى مباشرة",
    },
  ],
  beheira: [
    {
      name: "د. بهجت حسين الشريف",
      address: "شارع أحمد عرابي، دمنهور، البحيرة",
      phone: "01005926289",
    },
    {
      name: "د. محمد النجار",
      address: "ميدان الساعة، دمنهور، البحيرة",
      phone: "التواصل مع العيادة مباشرة",
    },
    {
      name: "مركز الصفوة لأمراض السمع والاتزان",
      address: "أبو بكر الصديق، تموس، دمنهور، البحيرة",
      phone: "01272998934",
    },
  ],
  benisuef: [
    {
      name: "النيل للسمعيات بني سويف",
      address: "بني سويف",
      phone: "01202088970",
    },
    {
      name: "عيادة د. خالد حسن يحيى",
      address: "الاوتوبيس القديم، بني سويف",
      phone: "020839135822",
    },
    {
      name: "عيادة د. سارة حسن علي",
      address: "شارع أحمد عرابي، برج الزهراء، بني سويف",
      phone: "01040483384",
    },
  ],
  portsaid: [
    {
      name: "د. ياسر مدين",
      address: "٢٩ شارع الجمهورية، حي الشرق، بورسعيد",
      phone: "التواصل مع العيادة مباشرة",
    },
    {
      name: "Amplifon – Portsaid",
      address: "4 شارع طرح البحر، حي الشرق، بورسعيد",
      phone: "01272092335",
    },
    {
      name: "عيادة د. محمد علي حسن الويشي",
      address: "73 شارع سعد زغلول، حي الشرق، بورسعيد",
      phone: "066202788332",
    },
  ],
  southsinai: [
    {
      name: "South Sinai Hospital",
      address: "طريق رأس كيندى، شرم الشيخ",
      phone: "0201280000205",
    },
    {
      name: "Sinai Clinic Hospital",
      address: "شرم الشيخ، جنوب سيناء",
      phone: "01281999947",
    },
  ],
  alexandria: [
    {
      name: "Amplifon - Sidi Gaber",
      address: "361 طريق الحرية، سيدى جابر، الإسكندرية",
      phone: "01220319998",
    },
    {
      name: "هيرنج للسماعات الطبية",
      address: "452 طريق الحرية، رشدى، الإسكندرية",
      phone: "035462449",
    },
    {
      name: "باورتون للسماعات الطبية",
      address: "سيدي بشر، أمام مستشفي شرق المدينة، الإسكندرية",
      phone: "التواصل مع المركز مباشرة",
    },
  ],
  suez: [
    {
      name: "إيجي تون للخدمات السمعية",
      address: "فيصل، السويس",
      phone: "01271543183",
    },
    {
      name: "عيادة د. صالح أبو العلا صالح",
      address: "شارع سعد زغلول، حي السويس، السويس",
      phone: "0623323111",
    },
  ],
  northsinai: [
    {
      name: "عيادة العريش الشاملة",
      address: "داخل مستشفي العريش العام، شارع الجيش، العريش",
      phone: "0683360121",
    },
    {
      name: "عيادة د. علاء سعيد بكري",
      address: "شارع 23 يوليو، العريش",
      phone: "0683358500",
    },
    {
      name: "عيادة د. جميل عبد العزيز ابو حجاج",
      address: "شارع البوسطة، العريش",
      phone: "0683353045",
    },
  ],
  gharbia: [
    {
      name: "عيادة د. أحمد خطاب",
      address: "شارع البحر، أمام بنك مصر، طنطا، الغربية",
      phone: "01024430921",
    },
    {
      name: "Specialist Center for Ear and Nose",
      address: "شارع الكورنيش مع شارع الاشرف، طنطا، الغربية",
      phone: "01064127028",
    },
    {
      name: "Opera Hearing Solutions Tanta Branch",
      address: "برج إبراهيم نصا، شارع النحاس، طنطا، الغربية",
      phone: "01000578077",
    },
  ],
  qalyubia: [
    {
      name: "ايجيبتون للسمعيات (Egyptone)",
      address: "شارع فرغلي، خلف أمن الدولة، بنها، القليوبية",
      phone: "01118511894",
    },
    {
      name: "مركز سماعات الاذن الطبية (فرع بنها)",
      address: "كورنيش النيل، بجوار البنك الاهلي والبنك الزراعي، بنها",
      phone: "01019777990",
    },
    {
      name: "إيرتون لسماعات ضعف السمع",
      address: "برج التطبيقين، طريق اسكندرية الزراعي، شبر الخيمة، القليوبية",
      phone: "01140407862",
    },
  ],
  qena: [
    {
      name: "ميركل للسماعات الطبية",
      address: "مدينة قنا",
      phone: "+469234612020",
    },
    {
      name: "عيادة د. بيتر سعد لأمراض الاذن والسمع",
      address: "شارع عبيد، قنا",
      phone: "01206992396",
    },
    {
      name: "Dr Mohamed Wael Clinic",
      address: "قسم قنا، قنا",
      phone: "01200618073",
    },
    {
      name: "عيادة د. الظافر مصطفي احمد",
      address: "شارع محمد حسني مبارك، نجع حمادى، قنا",
      phone: "0966589490",
    },
  ],
  kafr: [
    {
      name: "عيادة د. مني جاد",
      address: "عمارات المحاربين الجديدة، برج الجوهرة، كفر الشيخ",
      phone: "01275608130",
    },
    {
      name: "المركز المتكامل لعلاج أمراض السمع والاتزان",
      address: "عمارات المحاربين الجديدة، برج الجوهرة، كفر الشيخ",
      phone: "01017169051",
    },
  ],
  matrouh: [
    {
      name: "Amplifon - Marsa Matrouh",
      address: "برج فرعاص، شارع الإسكندرية، مرسى مطروح",
      phone: "01276195468",
    },
    {
      name: "عيادة د. محمد عبد العزيز محمد ابو سعد",
      address: "شارع الجلاء، مرسى مطروح",
      phone: "التواصل مع العيادة مباشرة",
    },
    {
      name: "عيادة د. ملك عبيد",
      address: "21 برج steha، شارع الإسكندرية، مرسى مطروح",
      phone: "التواصل مع العيادة مباشرة",
    },
  ],
  monufia: [
    {
      name: "Dr Ahmed Zein El Abedeen",
      address: "شبين الكوم، المنوفية",
      phone: "01004299201",
    },
    {
      name: "مركز وعي للتخاطب وتعديل السلوك",
      address: "ميدان شرف، شبين الكوم، المنوفية",
      phone: "01021749762",
    },
    {
      name: "شركة الدلتا لسماعات ضعاف السمع",
      address: "شارع جمال عبد الناصر، شبين الكوم، المنوفية",
      phone: "01003715437",
    },
  ],
  minya: [
    {
      name: "عيادة أ.د. خلف حميد",
      address: "برج الكوثر، سعد زغلول، المنيا",
      phone: "01060510053",
    },
    {
      name: "شركة عربية لحلول السمع",
      address: "برج محدلي، شارع المهاريث والهندسة، المنيا",
      phone: "01004455063",
    },
    {
      name: "مستشفي جامعة المنيا",
      address: "كورنيش المنيا، المنيا",
      phone: "0862157863",
    },
  ],
  newvalley: [
    {
      name: "عيادة د. شيماء إبراهيم البسط",
      address: "موط، شارع الري أمام مستشفي الداخلة العام، الوادي الجديد",
      phone: "01200087888",
    },
    {
      name: "عيادة الرحمه (د. حازم درويش)",
      address: "ميدان البساتين، برج الوقاف، الخارجة، الوادي الجديد",
      phone: "01020240801",
    },
  ],
};

function showCenters() {
  const selectedGov = document.getElementById("govSelect").value;
  const container = document.getElementById("centersContainer");

  container.innerHTML = "";

  if (selectedGov !== "none" && centersData[selectedGov]) {
    const centers = centersData[selectedGov];

    centers.forEach((center) => {
      const cardHTML = `
              <div class="col-md-6 col-lg-4">
                <div class="card center-card p-4 h-100 shadow-sm">
                  <h4 class="fw-bold text-dark mb-4">${center.name}</h4>
                  <div class="d-flex align-items-start mb-3">
                    <span class="center-icon">📍</span>
                    <div class="ms-2">
                      <strong class="d-block text-secondary">العنوان:</strong>
                      <span class="text-dark">${center.address}</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-start mt-auto">
                    <span class="center-icon">📞</span>
                    <div class="ms-2">
                      <strong class="d-block text-secondary">رقم التواصل:</strong>
                      <span class="text-dark fw-bold" dir="ltr">${center.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
      container.innerHTML += cardHTML;
    });
  }
}
