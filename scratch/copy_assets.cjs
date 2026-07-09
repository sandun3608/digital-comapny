const fs = require('fs');
const path = require('path');

const transfers = [
    ['C:\\Users\\etsy dream\\.gemini\\antigravity\\brain\\f81de33a-c8b0-491f-b9cb-e23eeec0a1e9\\service_mobile_advanced_v2_purple_1776364179376.png', 'c:\\Users\\etsy dream\\Desktop\\new2\\public\\assets\\s_mobile.png'],
    ['C:\\Users\\etsy dream\\.gemini\\antigravity\\brain\\f81de33a-c8b0-491f-b9cb-e23eeec0a1e9\\service_web_advanced_v2_purple_1776364200319.png', 'c:\\Users\\etsy dream\\Desktop\\new2\\public\\assets\\s_web.png'],
    ['C:\\Users\\etsy dream\\.gemini\\antigravity\\brain\\f81de33a-c8b0-491f-b9cb-e23eeec0a1e9\\service_ecom_advanced_v2_purple_1776364220443.png', 'c:\\Users\\etsy dream\\Desktop\\new2\\public\\assets\\s_ecom.png'],
    ['C:\\Users\\etsy dream\\.gemini\\antigravity\\brain\\f81de33a-c8b0-491f-b9cb-e23eeec0a1e9\\service_system_hologram_purple_v3_1776364397076.png', 'c:\\Users\\etsy dream\\Desktop\\new2\\public\\assets\\s_system.png'],
    ['C:\\Users\\etsy dream\\.gemini\\antigravity\\brain\\f81de33a-c8b0-491f-b9cb-e23eeec0a1e9\\service_uiux_hologram_purple_v3_1776364418795.png', 'c:\\Users\\etsy dream\\Desktop\\new2\\public\\assets\\s_uiux.png'],
    ['C:\\Users\\etsy dream\\.gemini\\antigravity\\brain\\f81de33a-c8b0-491f-b9cb-e23eeec0a1e9\\service_smm_hologram_purple_v3_1776364436877.png', 'c:\\Users\\etsy dream\\Desktop\\new2\\public\\assets\\s_smm.png'],
    ['C:\\Users\\etsy dream\\.gemini\\antigravity\\brain\\f81de33a-c8b0-491f-b9cb-e23eeec0a1e9\\service_marketing_hologram_purple_v3_1776364456833.png', 'c:\\Users\\etsy dream\\Desktop\\new2\\public\\assets\\s_marketing.png'],
    ['C:\\Users\\etsy dream\\.gemini\\antigravity\\brain\\f81de33a-c8b0-491f-b9cb-e23eeec0a1e9\\service_seo_hologram_purple_v3_1776364475055.png', 'c:\\Users\\etsy dream\\Desktop\\new2\\public\\assets\\s_seo.png'],
    ['C:\\Users\\etsy dream\\.gemini\\antigravity\\brain\\f81de33a-c8b0-491f-b9cb-e23eeec0a1e9\\service_cloud_purple_new_2_1776338826997.png', 'c:\\Users\\etsy dream\\Desktop\\new2\\public\\assets\\s_infra.png']
];

transfers.forEach(([src, dest]) => {
    try {
        fs.copyFileSync(src, dest);
        console.log(`Copied: ${dest}`);
    } catch (err) {
        console.error(`Error copying ${src} to ${dest}:`, err.message);
    }
});
