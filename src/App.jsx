import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Copy, RefreshCw, Box, Layers, Zap, Info, 
  CheckCircle2, AlertCircle, Loader2, Wand2, MessageSquareText, Palette, 
  BookOpen, Plus, Tag, Upload, X, Code, Database,
  Save, FolderOpen, ImageIcon as ImageIconUI, Monitor, Maximize, Eye, 
  SplitSquareHorizontal, Type as TypeIcon, Focus, Play, Award, BoxSelect, Lightbulb,
  HelpCircle, ImagePlus, Target, Trash2, TrendingUp, Sparkles as SparklesIcon,
  LayoutTemplate, Settings2, Type, Image as ImageIcon2, Frame, Lock, Key, ShieldCheck
} from 'lucide-react';

// ==========================================
// THIẾT LẬP CƠ BẢN & DATA
// ==========================================
const GROUPED_INDUSTRIES = {
  "Core Industries": [
    "F&B (Ẩm thực/Đồ uống)",
    "Beauty / Skincare (Làm đẹp/Mỹ phẩm)",
    "Real Estate (Bất động sản)",
    "Technology / App (Công nghệ/Ứng dụng)",
    "Fashion / Apparel (Thời trang)",
    "Healthcare (Y tế/Sức khỏe)"
  ],
  "Vietnam Local Business": [
    "Local Services (Spa mini, Nail, Sửa chữa...)",
    "E-commerce / Online Shop",
    "Interior & Construction (Nội thất/Xây dựng)",
    "Logistics / Delivery (Giao hàng/Kho bãi)",
    "Signage / Printing (In ấn/Biển hiệu)" 
  ],
  "Business & Finance": [
    "Finance / Insurance (Tài chính/Bảo hiểm)",
    "B2B Services (Agency, Kế toán, Thuế)",
    "Legal / Consulting (Pháp lý/Tư vấn)"
  ],
  "Lifestyle & Trends": [
    "Fitness / Gym / Yoga",
    "Pet (Thú cưng)",
    "Gaming / Esports",
    "Personal Brand / Content Creator",
    "Events / Entertainment (Sự kiện/Giải trí)",
    "Education / Soft Skills (Đào tạo/Kỹ năng)"
  ]
};

// THƯ VIỆN ẤN PHẨM & BẢNG HIỆU VIỆT NAM
const SIGNBOARD_CATEGORIES = {
  "Băng Rôn & Phướn (Bạt In)": [
    { id: "br_4x1", name: "Băng rôn ngang tiêu chuẩn (4x1m)", ratio: "4:1", desc: "Long horizontal printed banner, flat flex canvas material" },
    { id: "br_6x08", name: "Băng rôn ngang dài (6m x 0.8m)", ratio: "7:1", desc: "Extreme long horizontal panoramic printed banner, wide aspect format" },
    { id: "br_10x07", name: "Băng rôn ngang vắt phố siêu dài (10m x 0.7m)", ratio: "14:1", desc: "Ultra-extreme long horizontal panoramic street banner, very narrow height, extended width" },
    { id: "phuon_08x2", name: "Phướn dọc quảng cáo đứng (0.8m x 2m)", ratio: "2:5", desc: "Tall vertical hanging banner, portrait format" },
    { id: "phuon_cotdien", name: "Phướn dọc treo cột điện (0.6x1.5m)", ratio: "2:5", desc: "Narrow vertical street lamp hanging banner" },
    { id: "co_duoinheo", name: "Cờ đuôi nheo / Cờ phướn sự kiện", ratio: "1:4", desc: "Very narrow tall vertical event flag banner, pennant shape at the bottom" }
  ],
  "Bảng Hiệu Mặt Tiền (Storefront)": [
    { id: "mt_bạt_hiflex", name: "Biển bạt Hiflex khung sắt (Tỷ lệ 2:1)", ratio: "2:1", desc: "Standard horizontal storefront sign, printed canvas over iron frame" },
    { id: "mt_bat_3m", name: "Biển bạt 3M in UV xuyên sáng (Tỷ lệ 3:1)", ratio: "3:1", desc: "High-quality UV printed backlit flex banner storefront sign, glowing evenly" },
    { id: "mt_alu_mica", name: "Biển Alu nền phẳng, chữ nổi Mica (3:1)", ratio: "3:1", desc: "Storefront sign with flat composite aluminum background panel and embossed 3D acrylic letters" },
    { id: "mt_alu_inox", name: "Biển Alu nền phẳng, chữ nổi Inox (3:1)", ratio: "3:1", desc: "Storefront sign with flat composite background and glossy metallic stainless steel 3D letters" },
    { id: "mt_thanhlam", name: "Biển thanh lam nhôm (Zincalume) (4:1)", ratio: "4:1", desc: "Storefront sign with horizontal slatted aluminum background structure and 3D letters" },
    { id: "mt_tonsong", name: "Biển tôn sóng tĩnh điện chữ nổi (3:1)", ratio: "3:1", desc: "Storefront sign with corrugated metal sheet background and 3D letters" },
    { id: "mt_lamnhua", name: "Biển lam nhựa giả gỗ chữ nổi (3:1)", ratio: "3:1", desc: "Storefront sign with wood-grain plastic slat background and 3D letters" },
    { id: "mt_co", name: "Biển nền cỏ nhân tạo chữ nổi (3:1)", ratio: "3:1", desc: "Storefront sign with artificial green grass background and glowing 3D letters" }
  ],
  "Biển Vẫy & Hộp Đèn (Projecting Signs)": [
    { id: "vay_tron", name: "Biển vẫy tròn hộp đèn Mica hút nổi", ratio: "1:1", desc: "Perfectly circular projecting light box sign, vacuum formed acrylic" },
    { id: "vay_vuong", name: "Biển vẫy vuông hộp đèn Mica/Alu", ratio: "1:1", desc: "Perfectly square projecting light box sign" },
    { id: "vay_elip", name: "Biển vẫy hình elip hộp đèn", ratio: "4:3", desc: "Elliptical / oval shaped projecting light box sign" },
    { id: "vay_chunhat", name: "Biển vẫy chữ nhật đứng", ratio: "1:2", desc: "Vertical rectangular projecting sign board" },
    { id: "vay_ledruoi", name: "Biển vẫy LED ruồi (cắm hạt)", ratio: "1:1", desc: "Square projecting sign made of individual dotted LED bulbs forming letters and borders" },
    { id: "vay_ledmatrix", name: "Biển vẫy LED Matrix (Ma trận chữ)", ratio: "2:1", desc: "Digital LED matrix scrolling text sign board" },
    { id: "vay_go", name: "Biển vẫy gỗ khắc CNC/Laser", ratio: "1:1", desc: "Rustic projecting sign made of engraved natural solid wood" }
  ],
  "Biển Đứng & Vỉa Hè (Standing/Sidewalk)": [
    { id: "standee_cuon", name: "Standee cuốn nhôm (0.6x1.6m)", ratio: "3:8", desc: "Vertical floor-standing roll-up banner standee" },
    { id: "standee_x", name: "Standee chữ X (0.8x1.8m)", ratio: "4:9", desc: "Vertical floor-standing X-banner standee" },
    { id: "standee_diecut", name: "Standee mô hình bế hình (Die-cut)", ratio: "1:2", desc: "Die-cut custom shaped standing cardboard/plastic cutout display" },
    { id: "vh_khungsat", name: "Biển vỉa hè bạt khung sắt (0.8x1.2m)", ratio: "2:3", desc: "Vertical rectangular sidewalk sign, iron frame with flex canvas" },
    { id: "vh_hopden", name: "Biển vỉa hè hộp đèn Mica đứng", ratio: "1:2", desc: "Vertical floor-standing glowing acrylic light box" },
    { id: "vh_chuA", name: "Biển chữ A khung sắt vỉa hè (0.6x0.9m)", ratio: "2:3", desc: "A-frame foldable standing sidewalk sign board" },
    { id: "vh_xoay", name: "Hộp đèn đứng xoay 360 độ", ratio: "1:2", desc: "Vertical cylindrical or rectangular rotating floor-standing light box" }
  ],
  "Trong Nhà & Sự Kiện (Indoor/Events)": [
    { id: "in_backdrop", name: "Backdrop Sự kiện / Sân khấu (4x2.5m)", ratio: "16:9", desc: "Large flat indoor event backdrop wall, step and repeat banner style" },
    { id: "in_letan", name: "Biển vách logo quầy lễ tân (Reception)", ratio: "2:1", desc: "Corporate reception desk background wall with 3D logo and lettering" },
    { id: "in_neonsign", name: "Biển LED Neon Sign nghệ thuật", ratio: "16:9", desc: "Glowing neon tube art sign mounted on a dark indoor wall" },
    { id: "in_inox", name: "Biển công ty Inox ăn mòn (30x40cm)", ratio: "4:3", desc: "Small premium engraved stainless steel corporate door/wall plaque" },
    { id: "in_phongban", name: "Biển phòng ban Mica gắn tường", ratio: "2:1", desc: "Small acrylic office department sign mounted on a wall" },
    { id: "in_hanging", name: "Bảng chỉ dẫn thả trần (Hanging direction)", ratio: "4:1", desc: "Horizontal hanging directional sign suspended from the ceiling" },
    { id: "in_menuboard", name: "Menu board hộp đèn siêu mỏng", ratio: "16:9", desc: "Ultra-thin glowing menu board light box mounted on an indoor wall" },
    { id: "in_nameplate", name: "Biển chức danh để bàn (Mica/Gỗ)", ratio: "3:1", desc: "Small triangular desk nameplate made of acrylic or wood" }
  ]
};

const formatToRatioMap = {
  'poster': '4:5',
  'banner': '21:9',
  'social': '1:1',
  'infographic': '9:16',
  'signboard': '21:9'
};

const extendedAspectRatios = [
  '1:1', '4:5', '3:4', '2:3', '3:8', '4:9', '1:2', '2:5', '1:3', '1:4', 
  '5:4', '4:3', '3:2', '16:9', '21:9', '2:1', '3:1', '4:1', '7:1', '14:1'
];

const EDIT_SYSTEM_PROMPT = `Bạn là một Chuyên gia Kỹ sư Prompt (Prompt Engineer) cấp cao, chuyên sâu về mảng điều khiển các mô hình AI chỉnh sửa hình ảnh (như Gemini Flash Image, ChatGPT Image 2.0, Midjourney...). 
Nhiệm vụ duy nhất của bạn là: Tiếp nhận yêu cầu chỉnh sửa ảnh thô/ngắn gọn từ người dùng (thường bằng tiếng Việt) và tự động phân tích, mở rộng, rồi chuyển thể thành một Lệnh Prompt Tiêu Chuẩn cực kỳ chi tiết, chuyên nghiệp BẰNG TIẾNG ANH.

NGUYÊN TẮC CỐT LÕI MÀ BẠN PHẢI TUÂN THỦ:
Một prompt chỉnh sửa ảnh hoàn hảo KHÔNG BAO GIỜ chỉ nói "muốn thay đổi cái gì". Nó BẮT BUỘC phải quy định rõ ràng 3 ranh giới:
1. Chỉ được thay đổi cái gì?
2. Bắt buộc giữ nguyên cái gì? (Đặc biệt: khuôn mặt, ánh sáng, phối cảnh, tỷ lệ).
3. Tuyệt đối cấm làm gì? (Negative prompt: Không thêm vật thể lạ, không làm viền lỗi, không tạo hiệu ứng giả tạo).

QUY TRÌNH:
1. Phân tích ý định người dùng. Xác định rủi ro AI thường làm hỏng để đưa vào Negative Prompt.
2. NẾU NGƯỜI DÙNG ĐÍNH KÈM ẢNH: Hãy phân tích thật kỹ chi tiết bức ảnh đó (nhân vật, bối cảnh, ánh sáng, màu sắc) để miêu tả lại chính xác vào mục "MUST BE PRESERVED" và đưa ra cách xử lý phù hợp.
3. NẾU yêu cầu quá mơ hồ (VD: "làm ảnh đẹp lên"), HÃY TỰ ĐỘNG điền các thông số mặc định (tăng độ nét, cân bằng sáng...) bằng tiếng Anh thay vì hỏi lại.
4. Xuất ra CHÍNH XÁC theo format TIẾNG ANH dưới đây. KHÔNG thêm bất kỳ câu chào hỏi hay giải thích nào ngoài khung này. KHÔNG bọc trong markdown code block.

Here is the optimized prompt for your image editing tool. Please copy and paste this into the AI:

**"Edit this image with the highest fidelity to the original. Strictly adhere to the following boundaries:**

**1. MAIN OBJECTIVE:**
- [Clear and concise summary of the goal, e.g., Remove the woman in the red shirt walking behind the main subject].

**2. ALLOWED CHANGES:**
- [List exactly what can be modified, highly detailed, using photographic terminology].
- [How to handle the modified area, e.g., Reconstruct the background to match the original perspective and lighting].

**3. MUST BE PRESERVED (STRICTLY KEPT):**
- Complete facial identity, bone structure, expressions, and body proportions of the main subject.
- Overall composition, camera angle, focal length, and depth of field.
- Original lighting direction, shadows, and overall color grading.
- Hair edges, clothing, and all surrounding objects not in the modification scope.

**4. IMAGE QUALITY REQUIREMENTS:**
- Photorealistic, natural, appearing as if shot on a high-end DSLR/Mirrorless camera.
- Edited areas must be completely seamless, with clean borders and no bleeding edges.
- [Add specific requirements if any, e.g., Text must be spelled correctly without duplicated strokes].

**5. NEGATIVE PROMPT (ABSOLUTELY FORBIDDEN):**
- DO NOT add extra random objects, unnecessary decorations, or watermarks.
- DO NOT distort faces, hands, eyes, or anatomical details.
- DO NOT apply a 'plastic skin' effect, oversharpen, or create artificial textures.
- DO NOT alter the original perspective or shift other objects."**`;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const App = () => {
  const apiKey = ""; 

  // ==========================================
  // HỆ THỐNG BẢO MẬT & CẤP PHÉP (OFFLINE LICENSE)
  // ==========================================
  const [isActivated, setIsActivated] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [activationInput, setActivationInput] = useState('');
  const [licenseError, setLicenseError] = useState('');
  
  const [adminClickCount, setAdminClickCount] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminInputId, setAdminInputId] = useState('');
  const [adminSecretSalt, setAdminSecretSalt] = useState(''); 
  const [adminGeneratedKey, setAdminGeneratedKey] = useState('');
  const [copiedKeyMsg, setCopiedKeyMsg] = useState(false);
  
  const clickTimeoutRef = useRef(null);

  useEffect(() => {
    let storedId = localStorage.getItem('diorama_device_id');
    if (!storedId) {
      storedId = 'MC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      localStorage.setItem('diorama_device_id', storedId);
    }
    setDeviceId(storedId);

    const storedKey = localStorage.getItem('diorama_license_key');
    if (storedKey) {
      try {
        const decoded = atob(storedKey.split('').reverse().join(''));
        if (decoded.endsWith(`_${storedId}`)) {
          setIsActivated(true);
        }
      } catch (e) {}
    }
  }, []);

  const handleActivate = () => {
    try {
      const decoded = atob(activationInput.trim().split('').reverse().join(''));
      if (decoded.endsWith(`_${deviceId}`)) {
        localStorage.setItem('diorama_license_key', activationInput.trim());
        setIsActivated(true);
        setLicenseError('');
      } else {
        setLicenseError("Mã Kích Hoạt không hợp lệ. Vui lòng kiểm tra lại hoặc liên hệ Admin.");
      }
    } catch(e) {
      setLicenseError("Định dạng Mã Kích Hoạt không đúng.");
    }
  };

  const handleLockClick = (e) => {
    if (e.ctrlKey && e.shiftKey) {
      setAdminClickCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 10) {
          setShowAdminPanel(true);
          return 0;
        }
        return newCount;
      });

      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        setAdminClickCount(0);
      }, 3000); 
    }
  };

  const handleGenerateKey = () => {
    if (!adminInputId.trim() || !adminSecretSalt.trim()) return;
    const rawString = `${adminSecretSalt.trim()}_${adminInputId.trim()}`;
    const generated = btoa(rawString).split('').reverse().join('');
    setAdminGeneratedKey(generated);
  };

  const copyToClipboardCustom = (text, setCopiedState) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (setCopiedState) {
        setCopiedState(true);
        setTimeout(() => setCopiedState(false), 2000);
    }
  };

  // MAIN PIPELINE STATES
  const [selectedIndustry, setSelectedIndustry] = useState(''); 
  const [brandLevel, setBrandLevel] = useState('Generic (Chung chung / Mặc định)');
  const [isMascotEnabled, setIsMascotEnabled] = useState(false); 
  const [mascotInput, setMascotInput] = useState(''); 
  
  const [rawRequest, setRawRequest] = useState(''); 
  const [extractedData, setExtractedData] = useState(''); 
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExtractingImage, setIsExtractingImage] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isSuggestingMascot, setIsSuggestingMascot] = useState(false);
  
  const [customStyles, setCustomStyles] = useState([]);
  const [styleInput, setStyleInput] = useState('');
  const [trainingImages, setTrainingImages] = useState([]);
  const [isLearning, setIsLearning] = useState(false);
  
  const [ideaImages, setIdeaImages] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [supportImages, setSupportImages] = useState([]); 
  const [logoImages, setLogoImages] = useState([]);
  const [contentImages, setContentImages] = useState([]);
  
  const [strictCloneMode, setStrictCloneMode] = useState(false);
  const [isSignboardMode, setIsSignboardMode] = useState(false); 

  // SIGNBOARD SPECIFIC STATES
  const [selectedSignType, setSelectedSignType] = useState('');
  const [signboardMaterial, setSignboardMaterial] = useState('mica_3d');
  const [signboardLayoutMode, setSignboardLayoutMode] = useState('strict');
  const [signboardIncludeImage, setSignboardIncludeImage] = useState(true);
  const [signboardTextEffect, setSignboardTextEffect] = useState('clean');

  const [pipelineData, setPipelineData] = useState({
    industry: 'Đang chờ dữ liệu...',
    detectedFormat: 'social',
    aspectRatio: '1:1',
    forceExtremeRatio: false,
    englishHero: '',
    englishSupport: '', 
    englishDesc: '',
    refinedHeadline: '',
    exactProductText: '', 
    exactLogoDescription: '', 
    mood: '',
    color: '',
    layout: '',
    lighting: '',
    top3Styles: [
      { name: "Chờ AI phân tích...", reason: "" },
      { name: "Chờ AI phân tích...", reason: "" },
      { name: "Chờ AI phân tích...", reason: "" }
    ],
    top5TrendingStyles: [],
    suggestedLibraryStyles: [],
    validationPass: true,
    aiReasoning: "Sẵn sàng nhận dữ liệu."
  });

  const [generatedPrompts, setGeneratedPrompts] = useState(['', '', '']);
  const [activeVariant, setActiveVariant] = useState(0); 
  
  const [copyStatus, setCopyStatus] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('prompt'); 
  const [activeHelpModal, setActiveHelpModal] = useState(null);

  const hoveredZoneRef = useRef(null);
  const [activeHover, setActiveHover] = useState(null);

  // EDIT TOOL STATES
  const [editInputText, setEditInputText] = useState('');
  const [editGeneratedPrompt, setEditGeneratedPrompt] = useState('');
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editImageBase64, setEditImageBase64] = useState(null);
  const [editImageMimeType, setEditImageMimeType] = useState(null);
  const [isEditDragging, setIsEditDragging] = useState(false);
  const [editAiSuggestions, setEditAiSuggestions] = useState([]);
  const [isEditAnalyzing, setIsEditAnalyzing] = useState(false);
  const editFileInputRef = useRef(null);
  const editOutputRef = useRef(null);
  const [editCopied, setEditCopied] = useState(false);

  // HANDLERS
  const handleZoneEnter = (zone) => { hoveredZoneRef.current = zone; setActiveHover(zone); };
  const handleZoneLeave = () => { hoveredZoneRef.current = null; setActiveHover(null); };

  const updateExtractedData = (prefix, content) => {
    setExtractedData(prev => {
      const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`${escapedPrefix}[\\s\\S]*?(?=🎨|🖼️|🛍️|✨|🔣|📝|💡|$)`, 'g');
      let cleanPrev = prev.replace(regex, '').trim();
      return (cleanPrev ? cleanPrev + '\n\n' : '') + `${prefix}\n${content}`;
    });
  };

  const processFiles = async (files, setter, onComplete) => {
    const filesArray = Array.isArray(files) ? files : Array.from(files);
    const imagePromises = filesArray.filter(f => f.type.startsWith('image/')).map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ preview: e.target.result, base64: e.target.result.split(',')[1], mimeType: file.type });
        reader.readAsDataURL(file);
      });
    });
    const loadedImages = await Promise.all(imagePromises);
    if (loadedImages.length > 0) { setter(prev => [...prev, ...loadedImages]); if (onComplete) onComplete(loadedImages); }
  };

  const extractImageContent = async (images) => {
    setIsExtractingImage(true); setError(null);
    try {
      const parts = [{ text: "Phân tích BỐI CẢNH (Vibe/Background) VÀ HIỆU ỨNG CHỮ của bức ảnh này. \nCHỈ TRẢ VỀ thông tin thiết kế theo 4 gạch đầu dòng sau:\n- Phong cách (Art Style/Vibe):\n- Màu sắc nền (Background Color):\n- Hiệu ứng Text (Typography/Text Effect - Mô tả cực kỳ chi tiết vật liệu, độ nổi, màu sắc của CHỮ trong ảnh này):\n- Cảm xúc (Mood):" }];
      images.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } }));
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ role: "user", parts: parts }] }) });
      if (!response.ok) throw new Error('Failed to extract image.');
      const result = await response.json();
      updateExtractedData("🎨 [STYLE/VIBE REFERENCE - BỐI CẢNH & HIỆU ỨNG CHỮ]:", result.candidates[0].content.parts[0].text);
    } catch (e) { setError("Lỗi khi đọc bối cảnh: " + e.message); } finally { setIsExtractingImage(false); }
  };

  const extractProductContent = async (images) => {
    setIsExtractingImage(true); setError(null);
    try {
      const parts = [{ text: "Phân tích SẢN PHẨM CHÍNH (Hero Object) CẦN IN LÊN BIỂN HOẶC ẢNH: Hãy miêu tả cực kỳ chi tiết hình dáng, kích thước, tỷ lệ, màu sắc của sản phẩm/nhân vật trong ảnh này." }];
      images.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } }));
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ role: "user", parts: parts }] }) });
      if (!response.ok) throw new Error('Failed to extract product.');
      const result = await response.json();
      updateExtractedData("🛍️ [SẢN PHẨM CHÍNH BẮT BUỘC]:", result.candidates[0].content.parts[0].text);
    } catch (e) { setError("Lỗi khi đọc Sản phẩm: " + e.message); } finally { setIsExtractingImage(false); }
  };

  const extractSupportContent = async (images) => {
    setIsExtractingImage(true); setError(null);
    try {
      const parts = [{ text: "Phân tích VẬT THỂ PHỤ (Supporting Assets): Miêu tả chi tiết các nguyên liệu, phụ kiện, đồ trang trí đi kèm." }];
      images.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } }));
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ role: "user", parts: parts }] }) });
      if (!response.ok) throw new Error('Failed to extract supporting assets.');
      const result = await response.json();
      updateExtractedData("✨ [VẬT THỂ PHỤ / SUPPORTING ASSETS]:", result.candidates[0].content.parts[0].text);
    } catch (e) { setError("Lỗi khi đọc Vật thể phụ: " + e.message); } finally { setIsExtractingImage(false); }
  };

  const extractLogoContent = async (images) => {
    setIsExtractingImage(true); setError(null);
    try {
      const parts = [{ text: "Phân tích LOGO: Hãy miêu tả chi tiết hình dáng, biểu tượng, màu sắc và chữ (nếu có) của LOGO trong ảnh này." }];
      images.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } }));
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ role: "user", parts: parts }] }) });
      if (!response.ok) throw new Error('Failed to extract logo.');
      const result = await response.json();
      updateExtractedData("🔣 [LOGO CẦN IN]:", result.candidates[0].content.parts[0].text);
    } catch (e) { setError("Lỗi khi đọc Logo: " + e.message); } finally { setIsExtractingImage(false); }
  };

  const extractExactTextContent = async (images) => {
    setIsExtractingImage(true); setError(null);
    try {
      const parts = [{ text: `Phân tích chi tiết hình ảnh này. NẾU ĐÂY LÀ BẢN VẼ TAY / PHÁC THẢO LAYOUT (bản vẽ biển hiệu/quảng cáo), hãy thực hiện BÓC TÁCH BỐ CỤC chi tiết.
      
      🚨 LUẬT THÉP VỀ MÀU SẮC: 
      - BẠN CHỈ ĐƯỢC PHÉP ghi nhận màu sắc NẾU VÀ CHỈ NẾU người dùng có VIẾT CHỮ ghi chú màu rõ ràng (ví dụ: họ viết chữ "màu đỏ", "nền vàng").
      - NẾU HỌ KHÔNG VIẾT CHỮ GHI CHÚ MÀU: TUYỆT ĐỐI KHÔNG phân tích màu sắc, KHÔNG quan tâm họ đang dùng bút bi xanh, bút dạ đen hay giấy trắng. CHỈ LẤY NỘI DUNG CHỮ!

      TRẢ VỀ KẾT QUẢ THEO CẤU TRÚC:
      [VỊ TRÍ]: <Nội dung chữ> - <Màu sắc: CHỈ GHI NẾU CÓ CHỮ CHÚ THÍCH> - <Kích thước tương đối>.
      
      Ví dụ 1 (CÓ viết chữ ghi chú màu):
      [CHÍNH GIỮA, CỠ CHỮ RẤT LỚN]: Rửa Xe - Màu đỏ đậm.
      
      Ví dụ 2 (KHÔNG viết chữ ghi chú màu, dù họ vẽ bằng bút xanh):
      [TRÊN CÙNG, CỠ NHỎ]: Dịch vụ chăm sóc xe.
      [GÓC PHẢI DƯỚI]: (Yêu cầu chèn ảnh).
      
      Nếu chỉ là ảnh chứa văn bản thông thường (OCR), hãy đọc toàn bộ chữ. Tuyệt đối không miêu tả hình ảnh xung quanh trừ khi đó là ghi chú vị trí hoặc chỉ định chèn ảnh từ bản vẽ.` }];
      
      images.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } }));
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ role: "user", parts: parts }] }) });
      if (!response.ok) throw new Error('Failed to extract text/layout.');
      const result = await response.json();
      setRawRequest("📝 [TEXT & LAYOUT TRÍCH XUẤT TỪ BẢN VẼ (BẮT BUỘC TUÂN THỦ BỐ CỤC NÀY)]:\n\n" + result.candidates[0].content.parts[0].text);
      
      if (result.candidates[0].content.parts[0].text.toLowerCase().includes('bản vẽ') || result.candidates[0].content.parts[0].text.toLowerCase().includes('vị trí')) {
        setIsSignboardMode(true);
      }
    } catch (e) { setError("Lỗi khi đọc Text/Layout: " + e.message); } finally { setIsExtractingImage(false); }
  };

  const processEditFile = (file) => {
    if (!file || !file.type.startsWith('image/')) { setError('Vui lòng chọn hoặc dán một tệp hình ảnh hợp lệ để sửa.'); return; }
    setError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditImagePreview(URL.createObjectURL(file));
      const base64String = reader.result.split(',')[1];
      setEditImageBase64(base64String); setEditImageMimeType(file.type);
    };
    reader.readAsDataURL(file);
  };

  // ==========================================
  // HỆ THỐNG FIX LỖI PASTE BẰNG REF
  // ==========================================
  const pasteLogicRef = useRef({});
  useEffect(() => {
    pasteLogicRef.current = {
      processFiles,
      setTrainingImages,
      setIdeaImages,
      extractImageContent,
      setProductImages,
      extractProductContent,
      setSupportImages,
      extractSupportContent,
      setLogoImages,
      extractLogoContent,
      setContentImages,
      extractExactTextContent,
      processEditFile
    };
  });

  useEffect(() => {
    if (!isActivated) return;

    const handleGlobalPaste = (e) => {
      const currentZone = hoveredZoneRef.current;
      if (!currentZone) return;
      const items = e.clipboardData?.items || e.originalEvent?.clipboardData?.items;
      if (!items) return;
      
      const imageFiles = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) imageFiles.push(file);
        }
      }
      
      if (imageFiles.length > 0) {
        e.preventDefault();
        const fns = pasteLogicRef.current;
        if (currentZone === 'training') fns.processFiles(imageFiles, fns.setTrainingImages);
        else if (currentZone === 'idea') fns.processFiles(imageFiles, fns.setIdeaImages, fns.extractImageContent);
        else if (currentZone === 'product') fns.processFiles(imageFiles, fns.setProductImages, fns.extractProductContent);
        else if (currentZone === 'support') fns.processFiles(imageFiles, fns.setSupportImages, fns.extractSupportContent);
        else if (currentZone === 'logo') fns.processFiles(imageFiles, fns.setLogoImages, fns.extractLogoContent);
        else if (currentZone === 'content') fns.processFiles(imageFiles, fns.setContentImages, fns.extractExactTextContent);
        else if (currentZone === 'editTool') fns.processEditFile(imageFiles[0]); 
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    return () => window.removeEventListener('paste', handleGlobalPaste);
  }, [isActivated]);

  // ==========================================
  // CÁC HÀM XỬ LÝ KHÁC
  // ==========================================
  const generateIdeas = async () => {
    setIsSuggesting(true); setError(null);
    try {
      const mascotBlock = isMascotEnabled ? `\n🐾 [LINH VẬT / ĐẠI SỨ]: (Mô tả thật sinh động cách Linh vật: ${mascotInput ? `"${mascotInput}"` : "một linh vật cực kỳ cute/chất"} đang tương tác, cầm/nắm sản phẩm để thu hút khách hàng).` : "";
      const noMascotWarning = !isMascotEnabled ? `\n[LƯU Ý QUAN TRỌNG]: TUYỆT ĐỐI KHÔNG TỰ Ý THÊM HAY NHẮC ĐẾN BẤT KỲ LINH VẬT, NHÂN VẬT HOẠT HÌNH NÀO TRONG BÀI VIẾT NẾU NGƯỜI DÙNG KHÔNG BẬT TÍNH NĂNG NÀY.` : "";

      let contextText = `[VAI TRÒ CỦA BẠN]
Bạn là một Chuyên gia Copywriter Quảng cáo (Commercial Copywriter) siêu hạng kiêm Giám đốc Hình ảnh (Art Director), chuyên viết nội dung ra đơn (Conversion-driven) cho các chiến dịch Ads, Poster, Banner.

[NHIỆM VỤ]
Hãy phân tích hình ảnh đính kèm (nếu có) hoặc yêu cầu của người dùng để viết ra MỘT bài quảng cáo bán hàng đỉnh cao, nhắm thẳng vào tâm lý chốt sale.
${selectedIndustry ? `Ngành hàng mục tiêu đã chốt: "${selectedIndustry}".` : "TỰ ĐỘNG PHÂN TÍCH NGÀNH HÀNG TỪ DỮ LIỆU ĐẦU VÀO."}
Phân khúc thương hiệu (Brand Depth): "${brandLevel}". HÃY ĐIỀU CHỈNH GIỌNG VĂN CHO PHÙ HỢP VỚI PHÂN KHÚC NÀY.${noMascotWarning}

[CẤU TRÚC BÀI VIẾT BẮT BUỘC - STRICT FORMULA]
🔥 [HEADLINE]: (Viết 1 câu siêu ngắn).
💎 [VALUE]: (Chỉ ra giá trị cốt lõi).
🎁 [OFFER]: (Đưa ra Ưu đãi hoặc Giá bán hấp dẫn).
✨ [DETAIL]: (Liệt kê 2-3 gạch đầu dòng ngắn gọn về thành phần).
🎯 [CTA]: (Kêu gọi hành động ngắn, mạnh).${mascotBlock}

[GIỌNG VĂN] Nhịp điệu dồn dập, ngôn từ mang tính thôi miên thương mại. Phải là text để chạy Ads, KHÔNG viết văn mẫu SEO dài dòng!`;

      if (rawRequest.trim()) contextText += `\n\n[THÔNG TIN THÊM TỪ NGƯỜI DÙNG]: "${rawRequest}"`;
      const allAvailableImages = [...productImages, ...supportImages, ...logoImages, ...contentImages];
      if (allAvailableImages.length === 0) contextText += `\n\n[LƯU Ý]: Người dùng chưa tải ảnh lên. Hãy tự viết nội dung.`;

      const parts = [{ text: contextText }];
      allAvailableImages.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } }));

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ role: "user", parts: parts }] })
      });
      if (!response.ok) throw new Error('API Idea Generation Failed.');
      const result = await response.json();
      setRawRequest("💡 [ADS COPY - CHUẨN CHUYỂN ĐỔI]:\n\n" + result.candidates[0].content.parts[0].text);
    } catch (err) { setError("Lỗi khi tạo gợi ý: " + err.message); } finally { setIsSuggesting(false); }
  };

  const handleSuggestMascot = async () => {
    setIsSuggestingMascot(true); setError(null);
    try {
      const prompt = `Bạn là một Art Director. Hãy đưa ra MỘT ý tưởng thiết kế Linh vật (Mascot) cực kỳ dễ thương, sáng tạo và bắt mắt để đại diện cho ngành hàng "${selectedIndustry || 'Sản phẩm chung'}" thuộc phân khúc "${brandLevel}". CHỈ TRẢ VỀ ĐÚNG 1 CÂU MÔ TẢ NGẮN (5-10 từ).`;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }) });
      if (!response.ok) throw new Error('API Mascot Failed.');
      const result = await response.json();
      setMascotInput(result.candidates[0].content.parts[0].text.trim());
    } catch (err) { setError("Lỗi khi gợi ý Linh vật: " + err.message); } finally { setIsSuggestingMascot(false); }
  };

  const handleReadAllImages = async () => {
    if (ideaImages.length === 0 && productImages.length === 0 && supportImages.length === 0 && logoImages.length === 0 && contentImages.length === 0) {
      setError('Vui lòng tải lên ít nhất 1 ảnh ở các ô bên trên để đọc dữ liệu.'); return;
    }
    setIsExtractingImage(true); setError(null);
    try {
      const promises = [];
      if (ideaImages.length > 0) promises.push(extractImageContent(ideaImages));
      if (productImages.length > 0) promises.push(extractProductContent(productImages));
      if (supportImages.length > 0) promises.push(extractSupportContent(supportImages));
      if (logoImages.length > 0) promises.push(extractLogoContent(logoImages));
      if (contentImages.length > 0) promises.push(extractExactTextContent(contentImages));
      await Promise.all(promises);
    } catch (err) { setError('Lỗi khi đọc ảnh: ' + err.message); } finally { setIsExtractingImage(false); }
  };

  const handleSignTypeChange = (val) => {
    setSelectedSignType(val);
    if (!val) return;
    for (const group in SIGNBOARD_CATEGORIES) {
      const item = SIGNBOARD_CATEGORIES[group].find(i => i.id === val);
      if (item) {
        setPipelineData(prev => ({ ...prev, aspectRatio: item.ratio }));
        break;
      }
    }
  };

  const handleResetStep2 = () => {
    setSelectedIndustry(''); setBrandLevel('Generic (Chung chung / Mặc định)');
    setIsMascotEnabled(false); setMascotInput(''); setRawRequest(''); setExtractedData('');
    setIdeaImages([]); setProductImages([]); setSupportImages([]); setLogoImages([]); setContentImages([]);
    setStrictCloneMode(false); setIsSignboardMode(false);
    
    setSignboardMaterial('mica_3d');
    setSignboardLayoutMode('strict');
    setSignboardIncludeImage(true);
    setSignboardTextEffect('clean');
    setSelectedSignType('');

    setPipelineData({
      industry: 'Đang chờ dữ liệu...', detectedFormat: 'social', aspectRatio: '1:1', forceExtremeRatio: false,
      englishHero: '', englishSupport: '', englishDesc: '', refinedHeadline: '', exactProductText: '', exactLogoDescription: '', 
      mood: '', color: '', layout: '', lighting: '',
      top3Styles: [{ name: "Chờ AI phân tích...", reason: "" }, { name: "Chờ AI phân tích...", reason: "" }, { name: "Chờ AI phân tích...", reason: "" }],
      top5TrendingStyles: [], suggestedLibraryStyles: [], validationPass: true, aiReasoning: "Sẵn sàng nhận dữ liệu."
    });
    setGeneratedPrompts(['', '', '']); setError(null);
  };

  const handleTrainingFileChange = (e) => { if (e.target.files.length > 0) processFiles(e.target.files, setTrainingImages); };
  const removeTrainingImage = (index) => setTrainingImages(prev => prev.filter((_, i) => i !== index));
  const handleIdeaFileChange = (e) => { if (e.target.files.length > 0) processFiles(e.target.files, setIdeaImages, extractImageContent); };
  const removeIdeaImage = (index) => setIdeaImages(prev => prev.filter((_, i) => i !== index));
  const handleProductFileChange = (e) => { if (e.target.files.length > 0) processFiles(e.target.files, setProductImages, extractProductContent); }; 
  const removeProductImage = (index) => setProductImages(prev => prev.filter((_, i) => i !== index));
  const handleSupportFileChange = (e) => { if (e.target.files.length > 0) processFiles(e.target.files, setSupportImages, extractSupportContent); }; 
  const removeSupportImage = (index) => setSupportImages(prev => prev.filter((_, i) => i !== index));
  const handleLogoFileChange = (e) => { if (e.target.files.length > 0) processFiles(e.target.files, setLogoImages, extractLogoContent); };
  const removeLogoImage = (index) => setLogoImages(prev => prev.filter((_, i) => i !== index));
  const handleContentFileChange = (e) => { if (e.target.files.length > 0) processFiles(e.target.files, setContentImages, extractExactTextContent); };
  const removeContentImage = (index) => setContentImages(prev => prev.filter((_, i) => i !== index));

  const exportStyles = () => {
    if (customStyles.length === 0) return setError("Không có style nào để lưu!");
    const dataStr = JSON.stringify(customStyles, null, 2);
    const blob = new Blob([dataStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob); const link = document.createElement("a");
    link.href = url; link.download = "diorama_ai_styles_library.txt";
    document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url);
  };

  const handleImportStyles = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    let allNewStyles = []; let hasError = false;
    const readPromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedData = JSON.parse(event.target.result);
            if (Array.isArray(importedData)) allNewStyles = [...allNewStyles, ...importedData]; else hasError = true;
          } catch (err) { hasError = true; }
          resolve();
        };
        reader.readAsText(file);
      });
    });
    await Promise.all(readPromises);
    if (allNewStyles.length > 0) {
      setCustomStyles(prev => {
        const merged = [...prev];
        allNewStyles.forEach(newStyle => { if (!merged.find(s => s.aesthetic === newStyle.aesthetic)) merged.push(newStyle); });
        return merged;
      });
      if (hasError) setError("Đã nạp thành công các style hợp lệ, nhưng có một số file bị lỗi định dạng."); else setError(null);
    } else if (hasError) setError("Không thể đọc file hoặc sai định dạng JSON.");
    e.target.value = null;
  };

  const learnStyle = async () => {
    if (!styleInput.trim() && trainingImages.length === 0) return;
    setIsLearning(true); setError(null);
    const flatIndustries = Object.values(GROUPED_INDUSTRIES).flat();
    const systemPrompt = `Phân tích để tạo Style Profile. Trả về JSON: {"aesthetic": "Tên", "description": "Mô tả chi tiết để CÓ THỂ COPY Y HỆT", "suitable_industries": ["${flatIndustries.join('", "')}"], "color_palette": "Màu"}`;
    try {
      const parts = [{ text: systemPrompt + (styleInput ? `\n\nGhi chú: ${styleInput}` : '') }];
      trainingImages.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } }));
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: "user", parts: parts }], generationConfig: { responseMimeType: "application/json" } })
      });
      if (!response.ok) throw new Error('Không thể học style.');
      const result = await response.json();
      setCustomStyles(prev => [...prev, JSON.parse(result.candidates[0].content.parts[0].text)]);
      setStyleInput(''); setTrainingImages([]);
    } catch (err) { setError("Có lỗi: " + err.message); } finally { setIsLearning(false); }
  };

  const analyzeRequestPipeline = async () => {
    const combinedInput = `${rawRequest}\n\n${extractedData}`.trim();
    if (!combinedInput && ideaImages.length === 0 && contentImages.length === 0 && logoImages.length === 0 && productImages.length === 0 && supportImages.length === 0) return;
    setIsAnalyzing(true); setError(null);
    const customStylesContext = customStyles.length > 0 ? `\n[THƯ VIỆN STYLE CÁ NHÂN]: ${JSON.stringify(customStyles.map(s => s.aesthetic))}\nĐặc biệt chú ý nếu người dùng yêu cầu Clone Style hoặc chọn 10 style phù hợp nhất.` : '';
    
    let imageInstruction = "";
    if (isSignboardMode) {
        if (!signboardIncludeImage) {
            imageInstruction = "- TUYỆT ĐỐI KHÔNG DỊCH HOẶC TƯỞNG TƯỢNG BẤT KỲ HÌNH ẢNH MINH HỌA NÀO (Hero/Support). Bỏ trống biến englishHero và englishSupport. Chỉ tập trung vào TEXT.";
        } else {
            imageInstruction = `- 🛍️ NẾU LÀ BIỂN HIỆU (Signboard Mode): Hãy dịch chi tiết Hero, Support, Logo và gom tất cả thành CÁC THÀNH PHẦN ĐỒ HỌA (Graphic elements/Decals/Icons) được in trực tiếp hoặc dập nổi TRÊN MẶT BIỂN HIỆU. Chúng KHÔNG PHẢI là vật thể thực ngoài đời.`;
        }
    } else {
        imageInstruction = `- 🛍️ [SẢN PHẨM CHÍNH]: Dịch chi tiết vật lý làm "englishHero".
       - ✨ [VẬT THỂ PHỤ]: Dịch chi tiết thành các vật thể bổ trợ vào "englishSupport". Nếu không có dữ liệu, hãy TỰ ĐỘNG TƯỞNG TƯỢNG VÀ BỔ SUNG 2-3 vật thể phụ cực kỳ phù hợp.`;
    }

    const systemPrompt = `Bạn là "Enterprise AI Art Director" - Giám đốc Sáng tạo cấp cao chuyên về Commercial & Advertising Design. 
    Nhiệm vụ của bạn là đọc Dữ liệu đầu vào (Text + Hình ảnh) và tự động suy luận để đưa ra giải pháp thiết kế xuất sắc nhất.
    Hãy chạy Data qua quy trình PIPELINE sau:

    1. CONTEXT & THEME INFERENCE (PHÂN TÍCH CHỦ ĐỀ & NGỮ CẢNH):
       - Ngành hàng mục tiêu: ${selectedIndustry || "Tự động suy luận từ dữ liệu"}.
       - Yêu cầu Linh vật (Mascot): ${isMascotEnabled ? `CÓ YÊU CẦU. ${mascotInput ? `Mô tả linh vật: "${mascotInput}"` : 'Tự động sáng tạo một linh vật cực kỳ phù hợp.'}` : 'KHÔNG CÓ.'}
       - NẾU CÓ 🎨 [STYLE/VIBE REFERENCE...]: BẮT BUỘC dùng thông tin này để fill vào "mood", "color", "lighting" và định hướng Style. 
         ✨ ĐẶC BIỆT NẾU LÀ CHẾ ĐỘ BIỂN HIỆU: Hãy phân tích thật kỹ "Hiệu ứng chữ" từ Vibe và miêu tả nó vào biến "englishDesc" hoặc "lighting" để AI lấy đó làm chất liệu cho chữ nổi trên biển.

    2. COMMERCIAL LAYOUT & INFOGRAPHIC STRUCTURE:
       ${isSignboardMode ? 
       `- BẮT BUỘC TRẢ VỀ "detectedFormat": "signboard".
       - BỐ CỤC: Dựa vào các ghi chú vị trí (Trên, dưới, trái, phải) trong dữ liệu OCR/Bản vẽ, hãy mô tả chính xác vào biến "layout". Lưu ý: NẾU NGƯỜI DÙNG CHỌN "BỐ CỤC Y MẪU", phải map layout 100% y hệt bản vẽ.` 
       : 
       `- Tùy thuộc vào Thể loại vừa nhận diện, gán ngay bố cục vào biến "layout" (VD: poster, banner, social).`
       }

    3. DYNAMIC DEPTH & ATMOSPHERE:
       ${isSignboardMode ?
       `- Gán "englishDesc" là mô tả nền của biển hiệu, KẾT HỢP với màu sắc và Vibe trích xuất từ [STYLE/VIBE REFERENCE]. Ví dụ: "Solid background panel in [Màu nền từ Vibe], flat vector style, material is [Chất liệu từ Vibe]".`
       :
       `- BẮT BUỘC bơm hiệu ứng không gian 3D, out-of-focus foreground.`
       }

    4. MULTI-ASSET COMPOSITION (CẤU TRÚC VẬT THỂ HERO & SUPPORT):
       ${imageInstruction}
       - 🔣 [LOGO CẦN IN]: Nếu có ảnh Logo đầu vào, copy nguyên văn mô tả vào "exactLogoDescription". NẾU KHÔNG CÓ ẢNH LOGO, BẮT BUỘC TRẢ VỀ CHUỖI RỖNG "".
       - 📝 [TEXT CẦN IN]: BẮT BUỘC COPY 100% TOÀN BỘ CHỮ VÀ BỐ CỤC đã trích xuất vào "exactProductText". Dịch các ghi chú vị trí sang tiếng Anh (Và dịch màu sắc CHỈ NẾU BẢN GỐC CÓ GHI CHÚ). KHÔNG tự bịa thêm màu sắc nếu bản gốc không yêu cầu.

    5. COPYWRITER: Headline siêu ngắn (2-4 từ) vào "refinedHeadline".
    
    6. DYNAMIC STYLE CREATION:
       - Tự động sáng tạo TOP 3 STYLES xuất sắc nhất (Variant A, B, C) theo xu hướng toàn cầu. Trả về mảng "top3Styles". NẾU CÓ 🎨 [STYLE/VIBE REFERENCE...], đặt style đó làm Variant A.
       
    7. STYLE FILTERING (SMART MATCH - QUAN TRỌNG):
       - Dựa vào bối cảnh, ngành nghề và yêu cầu, HÃY LỌC RA TỐI ĐA 10 STYLE ĐẸP VÀ PHÙ HỢP NHẤT có trong [THƯ VIỆN STYLE CÁ NHÂN] (đặc biệt ưu tiên thiết kế phẳng, typography mạnh, biển quảng cáo ngoài trời/trong nhà nếu là chế độ Biển Hiệu).
       - Trả về mảng chứa TÊN các style vào "suggestedLibraryStyles". NẾU trống, trả về [].
       
    8. CONTEXT-AWARE TRENDING STYLE GENERATOR (PRO MODE):

       Generate EXACTLY 5 HIGH-QUALITY, REAL-WORLD USABLE DESIGN STYLES.

       CRITICAL REQUIREMENTS:
       Each style MUST be a COMPLETE DESIGN SYSTEM, not vague description.
       Each style MUST include:
       - Style Name (unique, commercial-ready)
       - Core Concept (clear visual idea)
       - Color Palette (max 3–4 colors only, no random colors)
       - Typography Direction (font style, weight, hierarchy)
       - Layout Strategy (how elements are arranged)
       - Image Treatment (cutout, duotone, silhouette, etc.)
       - Depth Rule (flat / fake 2.5D / no 3D allowed unless justified)

       STRICT RULES:
       - NO generic buzzwords (e.g. "modern", "premium" without explanation)
       - NO overused cheap effects (glow, heavy gradient, fake 3D chrome)
       - NO mixing conflicting styles
       - MUST be practical for REAL SIGNBOARD PRINTING
       - MUST prioritize readability and hierarchy
       - MUST feel like actual commercial design trend (2024–2025 level)

       QUALITY FILTER:
       Reject any style that:
       - looks like Canva template
       - looks outdated (pre-2018 aesthetic)
       - relies on effects instead of layout & typography

       OUTPUT FORMAT:
       Return array "top5TrendingStyles": each item is a structured string:
       "StyleName | Concept | Colors | Typography | Layout | Image | Depth"`;

    try {
      const parts = [{ text: systemPrompt + customStylesContext + `\n\n[INPUT CỦA NGƯỜI DÙNG & DỮ LIỆU ĐÃ TRÍCH XUẤT]:\n${combinedInput}` }];
      ideaImages.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } }));
      productImages.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } }));
      supportImages.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } }));
      contentImages.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } }));
      logoImages.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } }));
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contents: [{ role: "user", parts: parts }], 
          generationConfig: { 
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                industry: { type: "STRING" },
                detectedFormat: { type: "STRING" },
                englishHero: { type: "STRING" },
                englishSupport: { type: "STRING" },
                englishDesc: { type: "STRING" },
                refinedHeadline: { type: "STRING" },
                exactProductText: { type: "STRING" },
                exactLogoDescription: { type: "STRING" },
                mood: { type: "STRING" },
                color: { type: "STRING" },
                layout: { type: "STRING" },
                lighting: { type: "STRING" },
                top3Styles: { type: "ARRAY", items: { type: "OBJECT", properties: { name: { type: "STRING" }, reason: { type: "STRING" } } } },
                top5TrendingStyles: { type: "ARRAY", items: { type: "STRING" } },
                suggestedLibraryStyles: { type: "ARRAY", items: { type: "STRING" } }, 
                validationPass: { type: "BOOLEAN" },
                aiReasoning: { type: "STRING" }
              },
              required: ["industry", "detectedFormat", "englishHero", "englishSupport", "englishDesc", "refinedHeadline", "exactProductText", "exactLogoDescription", "mood", "color", "layout", "lighting", "top3Styles"]
            }
          } 
        })
      });
      
      if (!response.ok) throw new Error('API Pipeline Failed.');
      const result = await response.json();
      const aiData = JSON.parse(result.candidates[0].content.parts[0].text);
      if (!aiData.suggestedLibraryStyles) aiData.suggestedLibraryStyles = [];
      if (!aiData.top5TrendingStyles) aiData.top5TrendingStyles = [];
      
      const autoRatio = formatToRatioMap[aiData.detectedFormat?.toLowerCase()] || '1:1';
      const currentRatio = pipelineData.aspectRatio !== '1:1' ? pipelineData.aspectRatio : autoRatio;
      
      const newPipelineData = { ...pipelineData, ...aiData, aspectRatio: currentRatio };
      setPipelineData(newPipelineData);
      buildABPrompts(newPipelineData, strictCloneMode, false, isSignboardMode);
    } catch (err) { setError("Có lỗi Pipeline: " + err.message); } finally { setIsAnalyzing(false); }
  };

  const buildABPrompts = (data = pipelineData, isCloneMode = strictCloneMode, preserveVariant = false, forceSignboard = isSignboardMode) => {
    if (!data.top3Styles || data.top3Styles.length === 0) return;

    let extremeRatioNote = '';
    if (['7:1', '14:1', '4:1', '1:4', '1:3'].includes(data.aspectRatio)) {
        extremeRatioNote = ` EXTREME RATIO ENFORCEMENT: The output MUST forcefully respect the extreme ${data.aspectRatio} aspect ratio format (ultra-panoramic/super tall). Do not render as a standard square or landscape.`;
    }
    let ratioInstruction = `aspect ratio ${data.aspectRatio}. 100% FULL BLEED IMAGE, completely borderless edge-to-edge canvas.${extremeRatioNote}`;
    
    let visualDiscipline, visualImpactTrigger, lightFxSystem, materialPop, depthSeparation, colorPunch, lightingEffects, assetComposition, typoSystem;

    if (forceSignboard) {
      let materialInstruction = "";
      switch(signboardMaterial) {
        case 'mica_3d': materialInstruction = "3D embossed acrylic letters, polished stainless steel edges, glossy composite background panel. High-end physical signage texture."; break;
        case 'hiflex_print': materialInstruction = "Flat printed Hiflex canvas texture, crisp vector graphic style, 2D printing aesthetic without 3D extrusion."; break;
        case 'led_neon': materialInstruction = "Glowing neon glass tubes, bright LED matrix background, highly illuminated night-time signage effect."; break;
        case 'wood_vintage': materialInstruction = "Engraved natural wood texture, vintage painted letters, rustic boutique aesthetic."; break;
        default: materialInstruction = "Clean vector layout.";
      }

      let textEffectInstruction = "";
      if (signboardTextEffect === 'fancy') {
        textEffectInstruction = "Highly stylized typography, vivid gradients, dynamic 3D text effects, visually striking font design meant to grab attention.";
      } else if (signboardTextEffect === 'vibe_match') {
        textEffectInstruction = `CRITICAL: The typography style, font treatment, and text effects MUST EXACTLY MATCH the vibe reference described as: ${data.englishDesc}. Emulate the exact text material and illumination from the reference.`;
      } else {
        textEffectInstruction = "Ultra-clean, highly legible sans-serif commercial typography. Solid flat colors optimized for readability from a distance.";
      }

      let layoutInstruction = "";
      if (signboardLayoutMode === 'strict') {
        layoutInstruction = `STRICTLY map the visual elements EXACTLY to the spatial arrangement provided in the layout block below. DO NOT deviate from the positions. Layout context: ${data.layout}`;
      } else {
        layoutInstruction = `Use the provided text, but creatively arrange the layout for maximum commercial impact and aesthetic balance. Layout context: ${data.layout}`;
      }

      let specificSignTarget = '';
      if (selectedSignType) {
         const activeSignType = Object.values(SIGNBOARD_CATEGORIES).flat().find(i => i.id === selectedSignType);
         if (activeSignType) specificSignTarget = `\n- SPECIFIC SIGN TYPE TARGET: ${activeSignType.desc}. FORCE THIS EXACT SHAPE AND FORMAT.`;
      }

      visualDiscipline = `[FLAT PRINT-READY SIGNBOARD DESIGN - CRITICAL OVERRIDE]
- Core Concept: A production-ready commercial storefront signboard or advertising billboard layout.${specificSignTarget}
- Perspective: PERFECTLY FLAT FRONT ELEVATION. Pure orthographic 2D view. ZERO perspective distortion.
- Environment: ISOLATED ON PURE SOLID WHITE BACKGROUND. NO mockups, NO storefronts, NO walls, NO environment, NO hanging chains. Just the flat rectangular sign itself.
- Material Target: ${materialInstruction}
- Structural Layout: ${layoutInstruction}`;

      visualImpactTrigger = `[SIGNBOARD VISUAL IMPACT]
- Legibility is paramount. High contrast between text and background.
- Massive, bold typography that demands attention from a distance.
- Text Style: ${textEffectInstruction}`;

      materialPop = `[SIGNAGE TEXTURES]
- Ensure reflections, shadows, and textures strictly adhere to the requested material type to simulate real-world high-end manufacturing (or flat printing).`;

      lightFxSystem = ""; 
      if (signboardMaterial === 'led_neon' || signboardTextEffect === 'vibe_match') {
        lightFxSystem = `[ILLUMINATION & LED FX]
- Apply intense, hyper-realistic LED backlighting, glowing typography, or internal neon illumination if specified by the vibe. Light should subtly interact with the signboard's back panel.`;
      }

      lightingEffects = `[ENVIRONMENTAL LIGHTING]
- Flat, even studio lighting to clearly illuminate the flat design without casting heavy directional shadows across the board.`;

      assetComposition = `[SIGNBOARD GRAPHICS & ASSETS INTEGRATION]
- BACKGROUND/BOARD SURFACE: Apply the vibe and mood described as "${data.englishDesc}" to the surface material/pattern of the flat signboard.
${signboardIncludeImage && data.englishHero ? `- MAIN GRAPHIC (HERO): Integrate "${data.englishHero}" prominently as a flat graphic, decal, or 2.5D element physically printed/mounted ON the board.` : ''}
${signboardIncludeImage && data.englishSupport ? `- SUPPORTING GRAPHICS: Add "${data.englishSupport}" as secondary decorative flat elements/icons around the text/hero ON the board.` : ''}
${!signboardIncludeImage ? '- NO GRAPHIC IMAGES. Typography and abstract shapes/lines only.' : ''}`;

      typoSystem = `[EXACT SIGNBOARD COPY ENFORCEMENT]
CRITICAL: You are building a sign. DO NOT hallucinate random text. You MUST visually render EVERY SINGLE WORD provided below, matching the requested color and position perfectly.
- COPY & LAYOUT INSTRUCTIONS:\n"""\n${data.exactProductText.replace(/\n/g, ' ')}\n"""\n(Follow these rules exactly. Apply requested colors directly to the text material).`;

      if (data.exactLogoDescription) {
        typoSystem += `\n- BRAND LOGO: Precisely render "${data.exactLogoDescription}" as a graphic element printed/embossed ON the sign.`;
      }

      depthSeparation = ""; 
      colorPunch = ""; 

    } else {
      // ==========================================
      // STANDARD COMMERCIAL AD ENGINE (V12.5)
      // ==========================================
      visualDiscipline = `[PREMIUM VISUAL DISCIPLINE - CRITICAL]
- Aesthetic Target: High-end editorial, award-winning Cannes Lions advertising campaign.
- Execution: Strict photographic realism. NO cheap CGI, NO plastic textures. 
- Effect Control: Avoid cheap or artificial-looking effects. Allow subtle high-end commercial effects if physically realistic.
- Composition: Sophisticated negative space, clear breathing room. Masterful visual hierarchy.
- Color Grading: Cinematic, cohesive color harmony (Target: ${data.color}). Avoid chaotic neon unless explicitly specified by the brand.`;

      visualImpactTrigger = `[VISUAL IMPACT TRIGGER - COMMERCIAL]
The image must include ONE strong visual trigger: 
- bold contrast between light and dark areas 
- or a striking highlight zone that immediately attracts attention 
- or a dynamic composition that creates instant visual tension.
CRITICAL: The viewer must notice the image within 0.3 seconds. Avoid visually safe or passive compositions.`;

      lightFxSystem = `[CONTROLLED LIGHT FX SYSTEM]
Allow subtle premium light effects ONLY when physically believable: 
- soft highlight bloom on bright reflective surfaces 
- gentle light diffusion around strong highlights 
- subtle volumetric light (light rays interacting with atmosphere).
CRITICAL: Effects must follow real-world light physics. NO artificial glow, NO neon outlines. Effects must enhance realism, not replace it.`;

      materialPop = `[MATERIAL POP BOOST]
Enhance material attractiveness: emphasize micro highlights on textures (oil, glass, skin, metal), increase perceived richness and tactile quality, subtle contrast boost at surface level.
CRITICAL: Materials must feel premium, rich, and physically believable. Avoid flat or matte-looking surfaces unless intentionally designed.`;

      depthSeparation = `[DEPTH & SEPARATION BOOST]
Create strong visual separation: subject must clearly stand out from background. Use depth contrast and light falloff to isolate the hero. Background slightly softer, less contrast.
CRITICAL: Avoid flat depth where all elements appear equally sharp or equally lit.`;

      colorPunch = `[COMMERCIAL COLOR PUNCH]
Apply controlled high-end color grading: slightly boosted saturation in key subject areas, richer highlights and deeper shadows. Maintain natural skin tones and realistic color balance.
CRITICAL: Avoid dull, washed-out tones. Avoid extreme or unrealistic color shifts.`;

      lightingEffects = `[CINEMATOGRAPHY & STUDIO LIGHTING]
- Camera: Shot on ARRI Alexa 65, medium format lens, exquisite optical depth of field.
- Lighting Setup: ${data.lighting}.
- Techniques: Implement premium studio strobe techniques and subtle rim lighting to separate subjects from the background.`;

      assetComposition = `[FOCAL HIERARCHY & ASSET COMPOSITION]
- HERO [MAIN FOCAL POINT]: ${data.englishHero}. (Must be ultra-sharp, intensely detailed, catching the best commercial light).
${data.englishSupport ? `- SUPPORTING ASSETS [OUT OF FOCUS/BACKGROUND]: ${data.englishSupport}. (Integrate to create 3D spatial depth, MUST be slightly blurred. Do NOT compete with Hero).` : ''}
- ENVIRONMENT: ${data.englishDesc} (${data.layout})`;

      typoSystem = `[TYPOGRAPHY SYSTEM & EXACT COPY ENFORCEMENT]\nReserve clean, structured negative space for external text placement. CRITICAL: DO NOT hallucinate, invent, or generate any random text.`;
      if (data.exactLogoDescription) typoSystem += `\n- BRAND LOGO: Precisely render "${data.exactLogoDescription}" in a designated safe corner.`;
      else typoSystem += `\n- ANTI-LOGO GUARDRAIL: ABSOLUTELY NO LOGOS. Do NOT hallucinate, generate, or add any random brand icons or symbols.`;

      if (data.exactProductText || data.refinedHeadline) {
        if (data.refinedHeadline) typoSystem += `\n- HEADLINE: "${data.refinedHeadline}" (Render with massive, bold, premium commercial typography).`;
        if (data.exactProductText) typoSystem += `\n- EXACT COPY CONTENT TO PRINT: """ ${data.exactProductText.replace(/\n/g, ' ')} """\n(MANDATORY: Render EVERY SINGLE WORD provided above. Typography must be prominent and perfectly spelled).`;
      } else if (!data.exactLogoDescription) typoSystem = `[TYPOGRAPHY SYSTEM]\n- ABSOLUTELY NO TEXT OR LOGOS. The design must be completely typography-free.`;
    }

    let negativePrompt = `generic stock photo, cheap 3D render, plastic skin, amateur photoshop, overly saturated neon, predictable composition, cluttered composition, fake glow, artificial light effects, sterile, duplicated faces, mutated anatomy, flat lighting, dull colors, washed out, unrealistic materials, text overlapping product, hallucinated text, random letters${!data.exactLogoDescription ? ', random logos, fake brand icons, watermarks' : ''}`;
    
    if (forceSignboard) {
       negativePrompt = `mockup, storefront, mounted on wall, hanging sign, perspective, angled view, 3d environment, shadow on wall, real world background, people, street, outdoor environment, ${negativePrompt}`;
    }

    const newPrompts = data.top3Styles.map((styleObj) => {
      const baseHeader = isCloneMode ? `[100% EXACT REPLICA MASTER]` : `[AGENCY-GRADE HIGH-CONVERTING COMMERCIAL MASTER]`;
      const styleInfo = isCloneMode ? `CRITICAL DIRECTIVE: You are executing a 1:1 EXACT CLONE of the reference image.` : `ARTISTIC STYLE: Base: ${forceSignboard ? 'Flat Vector Graphic / Signage Design' : 'Photorealistic commercial rendering'}. Overlay style: ${styleObj.name}. STRICT RULE: do NOT mix multiple styles.`;

      return `${baseHeader}
Ultra-high resolution 8K UHD, gigapixel detail, print-ready advertising composite for ${data.detectedFormat}, ${ratioInstruction}
${styleInfo}

${visualDiscipline}
${visualImpactTrigger}
${lightFxSystem}
${materialPop}
${depthSeparation}
${colorPunch}
${lightingEffects}
${assetComposition}
${typoSystem}

NEGATIVE: ${isCloneMode ? 'creative deviation, altered composition, redesigned objects, ' : ''}${negativePrompt}`;
    });

    setGeneratedPrompts(newPrompts);
    if (!preserveVariant) setActiveVariant(0); 
  };

  const handleCopy = (textToCopy) => {
    try {
      const textArea = document.createElement("textarea"); textArea.value = textToCopy; textArea.style.position = "fixed"; textArea.style.left = "-9999px"; textArea.style.top = "0"; document.body.appendChild(textArea); textArea.focus(); textArea.select();
      document.execCommand('copy'); document.body.removeChild(textArea);
      setCopyStatus(true); setTimeout(() => setCopyStatus(false), 2000);
    } catch (err) { setError("Vui lòng sao chép thủ công."); }
  };

  const applySelectedStyle = (styleName) => {
    const newTop3 = [...pipelineData.top3Styles]; if (newTop3.length === 0) return;
    newTop3[activeVariant] = { name: styleName, reason: "Được người dùng chọn thủ công" };
    const newData = { ...pipelineData, top3Styles: newTop3 };
    setPipelineData(newData); buildABPrompts(newData, strictCloneMode, true, isSignboardMode); 
  };

  useEffect(() => {
    if (pipelineData.top3Styles && pipelineData.top3Styles.length > 0) buildABPrompts(pipelineData, strictCloneMode, false, isSignboardMode);
  }, [pipelineData.industry, pipelineData.detectedFormat, pipelineData.aspectRatio, pipelineData.englishHero, pipelineData.englishSupport, pipelineData.layout, pipelineData.exactProductText, pipelineData.exactLogoDescription, strictCloneMode, pipelineData.forceExtremeRatio, isSignboardMode, signboardMaterial, signboardLayoutMode, signboardIncludeImage, signboardTextEffect, selectedSignType]);

  const handleEditFileChange = (e) => { if (e.target.files && e.target.files[0]) processEditFile(e.target.files[0]); };
  const handleEditDragOver = (e) => { e.preventDefault(); setIsEditDragging(true); };
  const handleEditDragLeave = (e) => { e.preventDefault(); setIsEditDragging(false); };
  const handleEditDrop = (e) => {
    e.preventDefault(); setIsEditDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) processEditFile(e.dataTransfer.files[0]);
  };
  const handleRemoveEditImage = () => {
    setEditImagePreview(null); setEditImageBase64(null); setEditImageMimeType(null); setEditAiSuggestions([]);
    if (editFileInputRef.current) editFileInputRef.current.value = '';
  };

  const handleAnalyzeEditImage = async () => {
    if (!editImageBase64) return;
    setIsEditAnalyzing(true); setError(''); setEditAiSuggestions([]);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const prompt = "Hãy phân tích bức ảnh này và đưa ra đúng 20 ý tưởng chỉnh sửa (bằng tiếng Việt). Trả về JSON mảng.";
    const payload = {
      contents: [{ parts: [{ text: prompt }, { inlineData: { data: editImageBase64, mimeType: editImageMimeType } }] }],
      generationConfig: { temperature: 0.8, responseMimeType: "application/json" }
    };
    try {
      const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      const suggestions = JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
      setEditAiSuggestions(suggestions);
    } catch (err) { setError(`Lỗi phân tích ảnh: ${err.message}`); } finally { setIsEditAnalyzing(false); }
  };

  const handleGenerateEditPrompt = async () => {
    if (!editInputText.trim()) { setError('Vui lòng nhập yêu cầu chỉnh sửa ảnh của bạn.'); return; }
    setIsEditLoading(true); setError(''); setEditGeneratedPrompt(''); setEditCopied(false);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const parts = [{ text: editInputText }];
    if (editImageBase64) parts.push({ inlineData: { data: editImageBase64, mimeType: editImageMimeType } });
    try {
      const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts }], systemInstruction: { parts: [{ text: EDIT_SYSTEM_PROMPT }] }, generationConfig: { temperature: 0.4 } }) });
      const data = await response.json();
      setEditGeneratedPrompt(data.candidates?.[0]?.content?.parts?.[0]?.text.trim());
    } catch (err) { setError(`Lỗi: ${err.message}`); } finally { setIsEditLoading(false); }
  };

  const handleCopyEditPrompt = () => {
    const textarea = document.createElement('textarea'); textarea.value = editGeneratedPrompt; document.body.appendChild(textarea); textarea.select();
    document.execCommand('copy'); setEditCopied(true); setTimeout(() => setEditCopied(false), 2000); document.body.removeChild(textarea);
  };

  const formatOutputText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={index} className="font-bold text-white">{part.slice(2, -2)}</strong>;
      return <span key={index}>{part}</span>;
    });
  };

  // Nếu chưa kích hoạt bản quyền, chỉ hiển thị Màn hình Khóa
  if (!isActivated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full z-0 pointer-events-none"></div>

        <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-xl max-w-md w-full z-10 text-center relative">
          
          <div 
            onClick={handleLockClick}
            className="mx-auto w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 cursor-pointer hover:bg-slate-700/50 transition-colors border border-slate-700 shadow-inner group"
            title="Nhấn Ctrl + Shift + Click 10 lần để mở Admin Panel"
          >
            <Lock className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>

          <h1 className="text-2xl font-black text-white tracking-wide mb-2">HỆ THỐNG CẤP PHÉP</h1>
          <p className="text-sm text-slate-400 mb-8 leading-relaxed">
            Phiên bản <strong className="text-indigo-400">Prompt Pipeline Builder PRO</strong> yêu cầu khóa bản quyền để truy cập. Vui lòng copy Mã Máy dưới đây và gửi cho Admin.
          </p>

          <div className="text-left mb-6">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block flex items-center gap-1.5">
              <Monitor className="w-3 h-3" /> Mã Máy Của Bạn (Device ID)
            </label>
            <div className="flex bg-slate-950 border border-slate-700 rounded-lg p-1">
              <input 
                type="text" 
                readOnly 
                value={deviceId} 
                className="bg-transparent text-emerald-400 font-mono font-bold px-3 py-2 w-full outline-none text-sm text-center"
              />
              <button 
                onClick={() => copyToClipboardCustom(deviceId, setCopiedKeyMsg)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                {copiedKeyMsg ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy
              </button>
            </div>
          </div>

          <div className="text-left mb-6">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block flex items-center gap-1.5">
              <Key className="w-3 h-3" /> Nhập Mã Kích Hoạt
            </label>
            <input 
              type="text" 
              placeholder="Dán mã kích hoạt do Admin cấp vào đây..."
              value={activationInput}
              onChange={(e) => setActivationInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg p-3 outline-none text-slate-200 text-sm font-mono placeholder:text-slate-600 transition-all text-center"
            />
          </div>

          {licenseError && (
            <div className="mb-6 p-3 bg-red-950/40 border border-red-900/50 rounded-lg flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-400 font-medium">{licenseError}</p>
            </div>
          )}

          <button 
            onClick={handleActivate}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] active:scale-[0.98] uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" /> KÍCH HOẠT PHẦN MỀM
          </button>
        </div>

        {/* ADMIN KEYGEN MODAL */}
        {showAdminPanel && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <div className="bg-slate-900 border border-pink-500/50 p-6 rounded-2xl shadow-2xl max-w-md w-full relative">
              <button 
                onClick={() => {setShowAdminPanel(false); setAdminClickCount(0);}} 
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 rounded-full p-1"
              >
                <X className="w-4 h-4"/>
              </button>
              
              <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
                <div className="p-2 bg-pink-950 rounded-lg"><Key className="w-5 h-5 text-pink-400" /></div>
                <div>
                  <h3 className="text-lg font-black text-pink-400">ADMIN KEYGEN</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Trình Cấp Phép Ngoại Tuyến</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Khóa Bí Mật (SECRET SALT)</label>
                  <input 
                    type="password" 
                    value={adminSecretSalt}
                    onChange={(e) => setAdminSecretSalt(e.target.value)}
                    placeholder="Nhập khóa bí mật của bạn..."
                    className="w-full bg-slate-950 border border-slate-700 focus:border-pink-500 rounded-lg p-3 outline-none text-slate-200 text-sm font-mono text-center mb-3"
                  />
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Mã Máy Của Khách</label>
                  <input 
                    type="text" 
                    value={adminInputId}
                    onChange={(e) => setAdminInputId(e.target.value)}
                    placeholder="VD: MC-XXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-pink-500 rounded-lg p-3 outline-none text-slate-200 text-sm font-mono text-center"
                  />
                </div>
                
                <button 
                  onClick={handleGenerateKey}
                  className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 rounded-lg transition-all uppercase tracking-widest text-xs"
                >
                  Tạo Mã Kích Hoạt
                </button>

                {adminGeneratedKey && (
                  <div className="pt-4 border-t border-slate-800 mt-4">
                    <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5 block">Mã Kích Hoạt Trả Về</label>
                    <div className="flex bg-slate-950 border border-emerald-900/50 rounded-lg p-1">
                      <input 
                        type="text" 
                        readOnly 
                        value={adminGeneratedKey} 
                        className="bg-transparent text-emerald-400 font-mono font-bold px-3 py-2 w-full outline-none text-xs text-center"
                      />
                      <button 
                        onClick={() => copyToClipboardCustom(adminGeneratedKey, setCopiedKeyMsg)}
                        className="bg-emerald-900/50 hover:bg-emerald-800 text-emerald-400 px-3 py-2 rounded-md font-bold text-xs transition-colors flex items-center gap-1.5"
                      >
                        {copiedKeyMsg ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-[9px] text-slate-500 mt-2 text-center">Hãy copy mã này và gửi cho khách hàng.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Hiển thị giao diện chính
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-3">
              <Layers className="w-8 h-8 text-blue-400" /> Prompt Pipeline Builder <span className="text-xs font-bold text-slate-950 bg-emerald-400 px-2 py-0.5 rounded-md ml-2">PRO</span>
            </h1>
            <p className="text-slate-400 mt-1 uppercase tracking-widest text-[10px] font-bold">Hero Object Extraction & Strict Style Cloning</p>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            <ShieldCheck className="w-3 h-3 text-emerald-400"/> Bản quyền: {deviceId}
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-900/50 rounded-xl flex items-center gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-xs font-bold">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-300"><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* MODAL HƯỚNG DẪN */}
        {activeHelpModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-indigo-500/50 rounded-2xl p-6 max-w-xl w-full shadow-2xl relative">
              <button onClick={() => setActiveHelpModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 rounded-full p-1"><X className="w-5 h-5"/></button>
              <h3 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2 border-b border-slate-800 pb-3"><HelpCircle className="w-6 h-6"/> Hướng dẫn</h3>
              <div className="text-sm text-slate-300 space-y-4 leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
                <p>Hệ thống Engine V12.5 mới giúp tạo ra các bản thiết kế quảng cáo mang tính bùng nổ thị giác (Visual Impact) cực cao.</p>
                <p><strong>🔥 TÍNH NĂNG MỚI: TẠO BIỂN HIỆU TỪ BẢN VẼ TAY</strong></p>
                <p>Dán ảnh vẽ tay Layout vào ô "Ảnh Text In Ấn" {'->'} Bật "Thiết Kế Biển Hiệu" {'->'} Dùng bảng điều khiển mới hiện ra để chọn loại biển, chọn chất liệu (Mica, In bạt...) {'->'} AI sẽ tự map màu sắc và xuất file phẳng (không mockup) để in ấn ngay!</p>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => setActiveHelpModal(null)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors">Đã Hiểu</button>
              </div>
            </div>
          </div>
        )}

        {/* BƯỚC 1: HỌC STYLE */}
        <section className="mb-6 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-sm font-bold flex items-center gap-2 text-slate-300 uppercase tracking-widest">
              <BookOpen className="w-4 h-4 text-pink-400" /> Bước 1: Dạy AI Style & Nhập Thư viện
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-slate-800 text-slate-400 px-3 py-1.5 rounded-full border border-slate-700">{customStyles.length} Styles</span>
              <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700 flex items-center gap-1.5 transition-colors text-[10px] font-bold"><FolderOpen className="w-3 h-3 text-emerald-400" /><span>Load TXT</span><input type="file" multiple accept=".txt,.json" className="hidden" onChange={handleImportStyles} /></label>
              <button onClick={exportStyles} disabled={customStyles.length === 0} className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700 flex items-center gap-1.5 transition-colors text-[10px] font-bold"><Save className="w-3 h-3 text-blue-400" /><span>Save TXT</span></button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow flex flex-col gap-3">
              <label onMouseEnter={() => handleZoneEnter('training')} onMouseLeave={handleZoneLeave} className={`w-full border-2 border-dashed transition-colors rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer min-h-[80px] ${activeHover === 'training' ? 'border-pink-500 bg-pink-950/30' : 'border-slate-700/50 bg-slate-950/50 hover:bg-slate-900'}`}>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleTrainingFileChange} />
                {activeHover === 'training' ? <p className="text-sm font-bold text-pink-400 animate-pulse flex items-center gap-2"><Plus className="w-5 h-5" /> SẴN SÀNG: DÁN CTRL+V!</p> : <p className="text-sm font-medium text-slate-300 flex items-center gap-2"><Upload className="w-4 h-4" /> Rê chuột & Ctrl+V dán Style Ref</p>}
              </label>
              {trainingImages.length > 0 && <div className="flex gap-3 overflow-x-auto pb-2">{trainingImages.map((img, idx) => (<div key={idx} className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-700 group"><img src={img.preview} alt="Training" className="w-full h-full object-cover" /><button onClick={() => removeTrainingImage(idx)} className="absolute top-1 right-1 bg-black/70 hover:bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button></div>))}</div>}
            </div>
            <button onClick={learnStyle} disabled={isLearning || trainingImages.length === 0} className="md:w-32 bg-pink-900/20 text-pink-400 border border-pink-500/30 hover:bg-pink-900/40 disabled:opacity-50 disabled:bg-slate-900 rounded-xl font-bold flex flex-col items-center justify-center gap-1 transition-all p-2 text-xs uppercase tracking-wider">{isLearning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}Học Style</button>
          </div>
        </section>

        {/* BƯỚC 2: TRUNG TÂM PHÂN TÍCH */}
        <section className="mb-8 bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-indigo-500/30 p-1 rounded-2xl backdrop-blur-md shadow-2xl">
          <div className="p-5 md:p-7">
            <h2 className="text-sm font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 text-indigo-300 uppercase tracking-widest">
              <span className="flex items-center gap-2 shrink-0">
                <Wand2 className="w-4 h-4" /> Bước 2: Input & Chạy Pipeline
                <button onClick={() => setActiveHelpModal('step2')} className="ml-1 p-1 hover:bg-indigo-900/50 rounded-full text-indigo-500/70 hover:text-indigo-400 transition-colors" title="Hướng dẫn sử dụng"><HelpCircle className="w-4 h-4"/></button>
              </span>
              
              <div className="flex flex-col lg:flex-row items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={handleResetStep2} 
                  className="px-3 py-1.5 text-[10px] font-bold rounded-md bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-900/80 hover:text-red-200 transition-all flex items-center justify-center gap-1.5 shadow-md w-full lg:w-auto"
                >
                  <Trash2 className="w-3 h-3"/> LÀM LẠI TỪ ĐẦU
                </button>

                <div className="flex w-full lg:w-auto bg-slate-900/80 border border-slate-700/80 rounded-lg p-1 shadow-inner">
                  <button 
                    onClick={() => {setStrictCloneMode(false); setIsSignboardMode(false);}} 
                    className={`flex-1 lg:flex-none justify-center px-3 py-1.5 text-[10px] font-bold rounded-md transition-all flex items-center gap-1.5 ${!strictCloneMode && !isSignboardMode ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
                  >
                    <Sparkles className="w-3 h-3"/> AI SÁNG TẠO
                  </button>
                  <button 
                    onClick={() => {setStrictCloneMode(true); setIsSignboardMode(false);}} 
                    className={`flex-1 lg:flex-none justify-center px-3 py-1.5 text-[10px] font-bold rounded-md transition-all flex items-center gap-1.5 ${strictCloneMode && !isSignboardMode ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
                  >
                    <Focus className="w-3 h-3"/> TẠO RA Y MẪU 100%
                  </button>
                  <button 
                    onClick={() => {setIsSignboardMode(true); setStrictCloneMode(false);}} 
                    className={`flex-1 lg:flex-none justify-center px-3 py-1.5 text-[10px] font-bold rounded-md transition-all flex items-center gap-1.5 ${isSignboardMode ? 'bg-pink-600 text-white shadow-[0_0_10px_rgba(219,39,119,0.4)]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
                  >
                    <LayoutTemplate className="w-3 h-3"/> THIẾT KẾ BIỂN HIỆU
                  </button>
                </div>
              </div>
            </h2>

            {/* BẢNG ĐIỀU KHIỂN RIÊNG CHO CHẾ ĐỘ BIỂN HIỆU */}
            {isSignboardMode && (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 mb-5 p-4 bg-pink-950/20 border border-pink-500/30 rounded-xl shadow-inner">
                  
                  <div className="flex flex-col gap-1.5 md:col-span-2 xl:col-span-5 mb-2 border-b border-pink-900/30 pb-3">
                     <label className="text-[10px] font-bold text-pink-400 uppercase flex items-center gap-1">
                        <Frame className="w-3 h-3"/> Loại Bảng Hiệu / Ấn Phẩm Quảng Cáo (Việt Nam)
                     </label>
                     <select 
                        className="bg-slate-950 border border-pink-900/50 text-pink-200 text-[11px] font-medium p-2 rounded outline-none cursor-pointer" 
                        value={selectedSignType} 
                        onChange={e => handleSignTypeChange(e.target.value)}
                     >
                        <option value="">-- Tuỳ chọn (Tự thiết lập tỷ lệ bên dưới) --</option>
                        {Object.entries(SIGNBOARD_CATEGORIES).map(([cat, items]) => (
                           <optgroup key={cat} label={`=== ${cat} ===`} className="bg-slate-900 font-bold text-slate-400">
                              {items.map(item => (
                                 <option key={item.id} value={item.id} className="font-normal text-slate-200">{item.name}</option>
                              ))}
                           </optgroup>
                        ))}
                     </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] font-bold text-pink-400 uppercase flex items-center gap-1"><Settings2 className="w-3 h-3"/> Chất liệu biển</label>
                     <select className="bg-slate-900 border border-pink-900/50 text-pink-200 text-[11px] p-2 rounded outline-none cursor-pointer" value={signboardMaterial} onChange={e => setSignboardMaterial(e.target.value)}>
                        <option value="mica_3d">Chữ Nổi 3D Mica / Inox Gương</option>
                        <option value="hiflex_print">In Bạt Hiflex / Decal Phẳng</option>
                        <option value="led_neon">Biển LED Matrix / Neon Sign</option>
                        <option value="wood_vintage">Bảng Gỗ Khắc Vintage</option>
                     </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] font-bold text-pink-400 uppercase flex items-center gap-1"><SplitSquareHorizontal className="w-3 h-3"/> Bố cục (Layout)</label>
                     <select className="bg-slate-900 border border-pink-900/50 text-pink-200 text-[11px] p-2 rounded outline-none cursor-pointer" value={signboardLayoutMode} onChange={e => setSignboardLayoutMode(e.target.value)}>
                        <option value="strict">Giữ y hệt bản vẽ tay (Strict)</option>
                        <option value="creative">AI tự cân đối lại cho đẹp (Creative)</option>
                     </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] font-bold text-pink-400 uppercase flex items-center gap-1"><ImageIcon2 className="w-3 h-3"/> Ảnh minh họa</label>
                     <select className="bg-slate-900 border border-pink-900/50 text-pink-200 text-[11px] p-2 rounded outline-none cursor-pointer" value={signboardIncludeImage.toString()} onChange={e => setSignboardIncludeImage(e.target.value === 'true')}>
                        <option value="true">Chèn Hero/Support/Logo vào Biển</option>
                        <option value="false">KHÔNG chèn ảnh, chỉ làm Full Text</option>
                     </select>
                  </div>
                  <div className="flex flex-col gap-1.5 xl:col-span-2">
                     <label className="text-[10px] font-bold text-pink-400 uppercase flex items-center gap-1"><Type className="w-3 h-3"/> Hiệu ứng Chữ (Text Effect)</label>
                     <select className="bg-slate-900 border border-pink-900/50 text-pink-200 text-[11px] p-2 rounded outline-none cursor-pointer" value={signboardTextEffect} onChange={e => setSignboardTextEffect(e.target.value)}>
                        <option value="clean">Chữ phẳng, Rõ ràng, Dễ đọc</option>
                        <option value="fancy">Chữ nghệ thuật 3D, Nổi bật, Gradient</option>
                        <option value="vibe_match">🌟 Copy Hiệu Ứng Chữ từ ảnh Vibe</option>
                     </select>
                  </div>
               </div>
            )}

            {/* NHÓM CHỌN NGÀNH VÀ PHÂN KHÚC */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Box 1: Ngành hàng */}
              <div className="bg-slate-900/50 border border-slate-700/80 p-3 rounded-xl flex flex-col justify-center gap-2 shadow-inner">
                  <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Target className="w-4 h-4"/> Ngành hàng:
                  </label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-700 text-slate-300 text-[11px] font-bold p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500/50 outline-none appearance-none cursor-pointer transition-all hover:border-slate-500"
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                  >
                    <option value="">✨ Để AI Tự Động Nhận Diện</option>
                    {Object.entries(GROUPED_INDUSTRIES).map(([group, industries]) => (
                      <optgroup key={group} label={`--- ${group} ---`} className="bg-slate-900 text-slate-400 font-black">
                        {industries.map(ind => <option key={ind} value={ind} className="font-medium text-slate-200">{ind}</option>)}
                      </optgroup>
                    ))}
                  </select>
              </div>

              {/* Box 2: Phân Khúc / Độ sâu thương hiệu */}
              <div className="bg-slate-900/50 border border-slate-700/80 p-3 rounded-xl flex flex-col justify-center gap-2 shadow-inner">
                  <label className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4"/> Phân Khúc (Brand Depth):
                  </label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-700 text-slate-300 text-[11px] font-bold p-2.5 rounded-lg focus:ring-2 focus:ring-cyan-500/50 outline-none appearance-none cursor-pointer transition-all hover:border-slate-500"
                    value={brandLevel}
                    onChange={(e) => setBrandLevel(e.target.value)}
                  >
                    <option value="Generic (Chung chung / Mặc định)">Generic (Chung / Mặc định)</option>
                    <option value="Local Business (Quán nhỏ, Shop bình dân)">Local Business (Bình dân)</option>
                    <option value="Premium Brand (Cao cấp, Sang trọng, Đắt tiền)">Premium Brand (Cao cấp)</option>
                    <option value="Performance Ads (Tập trung chuyển đổi, Giật gân)">Performance Ads (Ra đơn)</option>
                  </select>
              </div>

              {/* Box 3: Mascot */}
              <div className="bg-slate-900/50 border border-slate-700/80 p-3 rounded-xl flex flex-col justify-center gap-2 shadow-inner">
                  <div className="flex items-center justify-between">
                     <label className="text-[10px] font-bold text-pink-400 uppercase tracking-widest flex items-center gap-1.5">
                        <SparklesIcon className="w-4 h-4"/> Có Linh Vật (Mascot)?
                     </label>
                     <label className="relative inline-flex items-center cursor-pointer">
                       <input type="checkbox" className="sr-only peer" checked={isMascotEnabled} onChange={() => setIsMascotEnabled(!isMascotEnabled)} />
                       <div className="w-8 h-4 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-pink-500"></div>
                     </label>
                  </div>
                  {isMascotEnabled ? (
                     <div className="relative w-full">
                       <input 
                         type="text"
                         className="w-full bg-slate-950 border border-pink-900/50 text-pink-200 text-[11px] font-medium p-2.5 pr-10 rounded-lg focus:ring-2 focus:ring-pink-500/50 outline-none transition-all placeholder:text-pink-900/50"
                         placeholder="Nhập mô tả (VD: Mèo đầu bếp)..."
                         value={mascotInput}
                         onChange={(e) => setMascotInput(e.target.value)}
                       />
                       <button 
                         onClick={handleSuggestMascot}
                         disabled={isSuggestingMascot}
                         className="absolute right-1.5 top-1.5 bottom-1.5 bg-pink-900/30 hover:bg-pink-900/60 text-pink-400 p-1.5 rounded-md transition-colors disabled:opacity-50"
                         title="AI Gợi ý Linh vật"
                       >
                         {isSuggestingMascot ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                       </button>
                     </div>
                  ) : (
                     <div className="w-full text-[10px] text-slate-500 italic p-2.5">
                       Bật công tắc nếu muốn chèn thêm linh vật.
                     </div>
                  )}
              </div>
            </div>

            {/* NHÓM ASSET GRID MỚI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-4">
              {/* Box 1: Bối cảnh */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-bold text-slate-400 uppercase">1. Bối cảnh / Vibe</label>
                <label 
                  onMouseEnter={() => handleZoneEnter('idea')}
                  onMouseLeave={handleZoneLeave}
                  className={`w-full border border-dashed transition-colors rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer min-h-[80px] h-full
                    ${activeHover === 'idea' ? 'border-indigo-400 bg-indigo-900/30' : 'border-indigo-500/30 bg-indigo-900/10 hover:bg-indigo-900/20'}
                  `}
                >
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleIdeaFileChange} />
                  {activeHover === 'idea' ? (
                    <p className="text-[10px] text-center font-bold text-indigo-300 animate-pulse"><Plus className="w-3 h-3 mx-auto mb-1" /> DÁN NỀN!</p>
                  ) : (
                    <p className="text-[10px] text-center font-medium text-indigo-300/70"><ImageIconUI className="w-3 h-3 mx-auto mb-1" /> Dán nền (Vibe)</p>
                  )}
                </label>
                {ideaImages.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto p-1.5 bg-slate-950/50 rounded-lg border border-slate-800">
                    {ideaImages.map((img, idx) => (
                      <div key={idx} className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-slate-700 group"><img src={img.preview} alt="Idea" className="w-full h-full object-cover" /><button onClick={() => removeIdeaImage(idx)} className="absolute top-0.5 right-0.5 bg-black/70 hover:bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-2 h-2" /></button></div>
                    ))}
                  </div>
                )}
              </div>

              {/* Box 2: ASSET COMPOSITION SYSTEM (CHIẾM 2 CỘT) */}
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-[9px] font-bold text-emerald-400 uppercase flex items-center gap-1"><Layers className="w-3 h-3"/> 2. ASSET COMPOSITION</label>
                <div className="grid grid-cols-2 gap-2 h-full">
                  {/* Hero Zone */}
                  <div className="flex flex-col gap-2 h-full">
                    <label 
                      onMouseEnter={() => handleZoneEnter('product')}
                      onMouseLeave={handleZoneLeave}
                      className={`w-full h-full border border-dashed transition-colors rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer min-h-[80px]
                        ${activeHover === 'product' ? 'border-emerald-400 bg-emerald-900/30' : 'border-emerald-500/30 bg-emerald-900/10 hover:bg-emerald-900/20'}
                        ${isSignboardMode && !signboardIncludeImage ? 'opacity-30 cursor-not-allowed' : ''}
                      `}
                    >
                      <input type="file" multiple accept="image/*" className="hidden" onChange={handleProductFileChange} disabled={isSignboardMode && !signboardIncludeImage} />
                      {activeHover === 'product' && !(isSignboardMode && !signboardIncludeImage) ? (
                        <p className="text-[10px] text-center font-bold text-emerald-300 animate-pulse"><Plus className="w-3 h-3 mx-auto mb-1" /> DÁN SẢN PHẨM!</p>
                      ) : (
                        <p className="text-[10px] text-center font-medium text-emerald-300/70"><BoxSelect className="w-3 h-3 mx-auto mb-1" /> {isSignboardMode ? 'Icon/Hình chèn' : 'Hero (Chính)'}</p>
                      )}
                    </label>
                    {productImages.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto p-1.5 bg-slate-950/50 rounded-lg border border-slate-800">
                        {productImages.map((img, idx) => (
                          <div key={idx} className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-slate-700 group"><img src={img.preview} alt="Product" className="w-full h-full object-cover" /><button onClick={() => removeProductImage(idx)} className="absolute top-0.5 right-0.5 bg-black/70 hover:bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-2 h-2" /></button></div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Support Zone */}
                  <div className="flex flex-col gap-2 h-full">
                    <label 
                      onMouseEnter={() => handleZoneEnter('support')}
                      onMouseLeave={handleZoneLeave}
                      className={`w-full h-full border border-dashed transition-colors rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer min-h-[80px]
                        ${activeHover === 'support' ? 'border-cyan-400 bg-cyan-900/30' : 'border-cyan-500/30 bg-cyan-900/10 hover:bg-cyan-900/20'}
                        ${isSignboardMode && !signboardIncludeImage ? 'opacity-30 cursor-not-allowed' : ''}
                      `}
                    >
                      <input type="file" multiple accept="image/*" className="hidden" onChange={handleSupportFileChange} disabled={isSignboardMode && !signboardIncludeImage} />
                      {activeHover === 'support' && !(isSignboardMode && !signboardIncludeImage) ? (
                        <p className="text-[10px] text-center font-bold text-cyan-300 animate-pulse"><Plus className="w-3 h-3 mx-auto mb-1" /> DÁN PHỤ KIỆN!</p>
                      ) : (
                        <p className="text-[10px] text-center font-medium text-cyan-300/70"><SparklesIcon className="w-3 h-3 mx-auto mb-1" /> Support (Phụ)</p>
                      )}
                    </label>
                    {supportImages.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto p-1.5 bg-slate-950/50 rounded-lg border border-slate-800">
                        {supportImages.map((img, idx) => (
                          <div key={idx} className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-slate-700 group"><img src={img.preview} alt="Support" className="w-full h-full object-cover" /><button onClick={() => removeSupportImage(idx)} className="absolute top-0.5 right-0.5 bg-black/70 hover:bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-2 h-2" /></button></div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Box 3: Logo */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-bold text-amber-400 uppercase flex items-center gap-1"><Award className="w-3 h-3"/> 3. Ảnh Logo</label>
                <label 
                  onMouseEnter={() => handleZoneEnter('logo')}
                  onMouseLeave={handleZoneLeave}
                  className={`w-full border border-dashed transition-colors rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer min-h-[80px] h-full
                    ${activeHover === 'logo' ? 'border-amber-400 bg-amber-900/30' : 'border-amber-500/30 bg-amber-900/10 hover:bg-amber-900/20'}
                    ${isSignboardMode && !signboardIncludeImage ? 'opacity-30 cursor-not-allowed' : ''}
                  `}
                >
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleLogoFileChange} disabled={isSignboardMode && !signboardIncludeImage} />
                  {activeHover === 'logo' && !(isSignboardMode && !signboardIncludeImage) ? (
                    <p className="text-[10px] text-center font-bold text-amber-300 animate-pulse"><Plus className="w-3 h-3 mx-auto mb-1" /> DÁN LOGO!</p>
                  ) : (
                    <p className="text-[10px] text-center font-medium text-amber-300/70"><Award className="w-3 h-3 mx-auto mb-1" /> Dán Logo</p>
                  )}
                </label>
                {logoImages.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto p-1.5 bg-slate-950/50 rounded-lg border border-slate-800">
                    {logoImages.map((img, idx) => (
                      <div key={idx} className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-slate-700 group"><img src={img.preview} alt="Logo" className="w-full h-full object-cover" /><button onClick={() => removeLogoImage(idx)} className="absolute top-0.5 right-0.5 bg-black/70 hover:bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-2 h-2" /></button></div>
                    ))}
                  </div>
                )}
              </div>

              {/* Box 4: Text */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-bold text-pink-400 uppercase flex items-center gap-1">
                  <TypeIcon className="w-3 h-3"/> 4. Layout Bản Vẽ / Text OCR
                </label>
                <label 
                  onMouseEnter={() => handleZoneEnter('content')}
                  onMouseLeave={handleZoneLeave}
                  className={`w-full border border-dashed transition-colors rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer min-h-[80px] h-full
                    ${activeHover === 'content' ? 'border-pink-400 bg-pink-900/30' : 'border-pink-500/30 bg-pink-900/10 hover:bg-pink-900/20'}
                  `}
                >
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleContentFileChange} />
                  {activeHover === 'content' ? (
                    <p className="text-[10px] text-center font-bold text-pink-300 animate-pulse"><Plus className="w-3 h-3 mx-auto mb-1" /> DÁN ẢNH LẤY CHỮ / LAYOUT!</p>
                  ) : (
                    <p className="text-[10px] text-center font-medium text-pink-300/70"><LayoutTemplate className="w-3 h-3 mx-auto mb-1" /> Dán Text OCR / Bản Vẽ</p>
                  )}
                </label>
                {contentImages.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto p-1.5 bg-slate-950/50 rounded-lg border border-slate-800">
                    {contentImages.map((img, idx) => (
                      <div key={idx} className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-slate-700 group"><img src={img.preview} alt="Content" className="w-full h-full object-cover" /><button onClick={() => removeContentImage(idx)} className="absolute top-0.5 right-0.5 bg-black/70 hover:bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-2 h-2" /></button></div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 items-stretch">
              
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <MessageSquareText className="w-3 h-3"/> Yêu cầu / Text Ads
                    </label>
                    <button 
                      onClick={generateIdeas} 
                      disabled={isSuggesting}
                      className="flex items-center gap-1.5 text-[9px] font-bold bg-amber-900/20 hover:bg-amber-900/50 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded transition-colors disabled:opacity-50"
                    >
                      {isSuggesting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Lightbulb className="w-3 h-3" />}
                      BÍ TEXT? GỢI Ý NGAY!
                    </button>
                  </div>
                  <textarea 
                    onMouseEnter={handleZoneLeave}
                    className="w-full flex-grow bg-slate-950/80 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-xs min-h-[120px] shadow-inner placeholder:text-slate-600 leading-relaxed" 
                    placeholder={isSignboardMode ? "Gõ yêu cầu mô tả thêm cho Biển Hiệu (chất liệu, ý tưởng màu sắc nền)..." : "Gõ yêu cầu, dán text quảng cáo (Thêm '[YÊU CẦU] TẠO INFOGRAPHIC' nếu muốn làm dạng inforgraphic)..."} 
                    value={rawRequest} 
                    onChange={(e) => setRawRequest(e.target.value)} 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center px-1 h-[24px]">
                    <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                      <Database className="w-3 h-3"/> Dữ liệu AI Đọc Từ Ảnh
                    </label>
                    <div className="flex items-center gap-2">
                      {isExtractingImage && (
                        <div className="text-emerald-400 flex items-center gap-1 text-[9px] font-bold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/50 animate-pulse">
                          <Eye className="w-3 h-3" /> Đang trích xuất...
                        </div>
                      )}
                      <button 
                        onClick={handleReadAllImages} 
                        disabled={isExtractingImage || (ideaImages.length === 0 && productImages.length === 0 && supportImages.length === 0 && logoImages.length === 0 && contentImages.length === 0)}
                        className="flex items-center gap-1 text-[9px] font-bold bg-emerald-900/20 hover:bg-emerald-900/50 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded transition-colors disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3 h-3 ${isExtractingImage ? 'animate-spin' : ''}`} />
                        ĐỌC DỮ LIỆU ẢNH
                      </button>
                    </div>
                  </div>
                  <textarea 
                    onMouseEnter={handleZoneLeave}
                    className="w-full flex-grow bg-slate-900/50 border border-emerald-900/30 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-xs min-h-[120px] shadow-inner text-emerald-300/80 font-mono placeholder:text-emerald-900/50 leading-relaxed" 
                    placeholder="Kết quả phân tích từ AI Vision (Bối cảnh, Sản phẩm, Phụ kiện, Text OCR, Ghi chú Bản vẽ Layout) sẽ tự động đổ vào đây..." 
                    value={extractedData} 
                    onChange={(e) => setExtractedData(e.target.value)} 
                  />
                </div>
              </div>

              <button 
                onClick={analyzeRequestPipeline} 
                disabled={isAnalyzing || (!rawRequest.trim() && !extractedData.trim() && ideaImages.length === 0 && productImages.length === 0 && supportImages.length === 0)} 
                className="md:w-40 bg-gradient-to-b from-indigo-500 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 disabled:from-slate-800 disabled:to-slate-900 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all p-4 shadow-lg shadow-indigo-900/20 border border-indigo-400/30 shrink-0"
              >
                {isAnalyzing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                <div className="text-center">
                  <div className="text-[11px] uppercase tracking-tighter">RUN PIPELINE</div>
                </div>
              </button>
            </div>
            
            {pipelineData.aiReasoning && (
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="col-span-2 p-3 bg-slate-900/80 border border-slate-700 rounded-lg flex items-start gap-3">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div><p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Log Phân tích</p><p className="text-[11px] text-slate-300">{pipelineData.aiReasoning}</p></div>
                </div>
                <div className={`p-3 border rounded-lg flex items-center gap-3 ${pipelineData.validationPass ? 'bg-emerald-950/30 border-emerald-900/50' : 'bg-red-950/30 border-red-900/50'}`}>
                  {pipelineData.validationPass ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                  <div><p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Validator Status</p><p className={`text-[11px] font-bold ${pipelineData.validationPass ? 'text-emerald-400' : 'text-red-400'}`}>{pipelineData.validationPass ? 'Passed' : 'Failed'}</p></div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CỘT 3: KẾT QUẢ A/B/C & CÔNG CỤ SỬA ẢNH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CỘT THÔNG SỐ (TRÁI) */}
          <div className="lg:col-span-4 space-y-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-800/60 shadow-xl">
            <h2 className="text-xs font-bold flex items-center gap-2 text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
              <Database className="w-4 h-4" /> Dữ liệu Chuẩn Hóa
              <button onClick={() => setActiveHelpModal('step3')} className="ml-auto p-1 hover:bg-slate-800 rounded-full text-slate-500 hover:text-slate-300 transition-colors" title="Hướng dẫn sử dụng"><HelpCircle className="w-3.5 h-3.5"/></button>
            </h2>
            <div className="space-y-3 p-3 bg-slate-950/30 rounded-xl border border-slate-800/50">
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1"><Zap className="w-3 h-3 text-emerald-400"/> English Hero ({isSignboardMode ? 'Icon chèn biển' : 'SP Chính'})</label>
                <textarea rows="3" className="w-full bg-slate-900 border border-emerald-900/50 rounded-md px-3 py-2 text-[11px] font-mono text-emerald-200 focus:outline-none" value={pipelineData.englishHero} onChange={(e) => setPipelineData({...pipelineData, englishHero: e.target.value})} disabled={isSignboardMode && !signboardIncludeImage} />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1"><Layers className="w-3 h-3 text-cyan-400"/> Supporting Assets (Vật thể phụ)</label>
                <textarea rows="2" className="w-full bg-slate-900 border border-cyan-900/50 rounded-md px-3 py-2 text-[11px] font-mono text-cyan-200 focus:outline-none placeholder:text-slate-600" value={pipelineData.englishSupport} onChange={(e) => setPipelineData({...pipelineData, englishSupport: e.target.value})} placeholder="Trống (AI sẽ tự động thêm nếu cần)..." disabled={isSignboardMode && !signboardIncludeImage} />
              </div>
              
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1"><Award className="w-3 h-3 text-amber-400"/> Chi tiết Logo (Nếu có)</label>
                <textarea rows="2" className="w-full bg-slate-900 border border-amber-900/50 rounded-md px-3 py-2 text-[11px] font-mono text-amber-200 focus:outline-none placeholder:text-slate-600" value={pipelineData.exactLogoDescription} onChange={(e) => setPipelineData({...pipelineData, exactLogoDescription: e.target.value})} placeholder="Trống (Không ép vẽ Logo)..." disabled={isSignboardMode && !signboardIncludeImage} />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1"><TypeIcon className="w-3 h-3 text-pink-400"/> Nội dung IN TRÊN SP {isSignboardMode && '(Bao gồm Ghi chú Layout)'}</label>
                <textarea rows="4" className="w-full bg-slate-900 border border-pink-900/50 rounded-md px-3 py-2 text-[11px] font-mono text-pink-200 focus:outline-none placeholder:text-slate-600" value={pipelineData.exactProductText} onChange={(e) => setPipelineData({...pipelineData, exactProductText: e.target.value})} placeholder="Trống (Không ép Text)..." />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1"><ImageIconUI className="w-3 h-3 text-indigo-400"/> Vibe / Background / Text Effect</label>
                <textarea rows="3" className="w-full bg-slate-900 border border-indigo-900/50 rounded-md px-3 py-2 text-[11px] font-mono text-indigo-200 focus:outline-none placeholder:text-slate-600" value={pipelineData.englishDesc} onChange={(e) => setPipelineData({...pipelineData, englishDesc: e.target.value})} placeholder="Mô tả bối cảnh hoặc hiệu ứng..." />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-900 border border-slate-700 p-2 rounded-md">
                  <label className="block text-[8px] font-bold text-slate-500 uppercase mb-1">Layout</label>
                  <input type="text" className="w-full bg-transparent text-[10px] text-blue-300 focus:outline-none" value={pipelineData.layout} onChange={(e) => setPipelineData({...pipelineData, layout: e.target.value})} />
                </div>
                <div className="bg-slate-900 border border-slate-700 p-2 rounded-md">
                  <label className="block text-[8px] font-bold text-slate-500 uppercase mb-1">Ratio</label>
                  <select className="w-full bg-transparent text-[10px] text-emerald-300 focus:outline-none" value={pipelineData.aspectRatio} onChange={(e) => setPipelineData({...pipelineData, aspectRatio: e.target.value})}>
                    {extendedAspectRatios.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-700 p-3 rounded-md mt-3">
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1"><Palette className="w-3 h-3 text-emerald-400"/> Gợi ý Style Variant {strictCloneMode ? '' : ` ${['A', 'B', 'C'][activeVariant]}`}</span>
                </label>
                <div className="text-[8px] text-emerald-400 mb-2 italic">Lọc theo ngành AI phân tích: {pipelineData.industry}</div>
                
                {strictCloneMode ? (
                  <div className="mt-2 p-3 border border-emerald-500/50 bg-emerald-950/30 rounded-lg flex items-start gap-2">
                    <Focus className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Chế Độ Y Mẫu 100% Đang Bật</p>
                      <p className="text-[10px] text-slate-300 leading-relaxed">Style được AI dùng mắt phân tích & trích xuất trực tiếp từ ảnh gốc của bạn. Tính năng gợi ý và thay đổi Style bị khóa để đảm bảo độ chính xác tuyệt đối.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {pipelineData.top5TrendingStyles && pipelineData.top5TrendingStyles.length > 0 && (
                      <div className="mb-3 border border-orange-500/30 bg-orange-950/20 p-2 rounded-lg">
                        <span className="text-[9px] text-orange-400 block mb-1 uppercase tracking-widest font-black flex items-center gap-1"><Sparkles className="w-3 h-3"/> 🔥 STYLE XU HƯỚNG THEO CHỦ ĐỀ (AI SÁNG TẠO):</span>
                        <div className="flex flex-wrap gap-1.5">
                          {pipelineData.top5TrendingStyles.map(s => (
                            <button 
                              key={`trending-${s}`} 
                              onClick={() => applySelectedStyle(s)} 
                              className={`text-[9px] px-2 py-1 rounded-md transition-colors border font-bold ${pipelineData.top3Styles[activeVariant]?.name === s ? 'bg-orange-600 border-orange-400 text-white shadow-[0_0_10px_rgba(234,88,12,0.3)]' : 'bg-orange-900/30 hover:bg-orange-900/60 text-orange-300 hover:text-orange-200 border-orange-500/40'}`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {customStyles.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-800">
                        <span className="text-[8px] text-pink-400 block mb-2 uppercase tracking-widest font-bold flex items-center gap-1"><Lightbulb className="w-3 h-3"/> Thư viện Style của bạn (AI Lọc):</span>
                        
                        {(() => {
                          const recommendedStyles = customStyles.filter(style => pipelineData.suggestedLibraryStyles?.includes(style.aesthetic));
                          const suitableStyles = customStyles.filter(style => 
                            !recommendedStyles.includes(style) && 
                            style.suitable_industries.some(ind => ind.toLowerCase().includes(pipelineData.industry.toLowerCase()) || pipelineData.industry.toLowerCase().includes(ind.toLowerCase()))
                          );

                          if (recommendedStyles.length === 0 && suitableStyles.length === 0) {
                            return <span className="text-[9px] text-slate-500 italic py-1 px-1">Chưa có style cá nhân nào phù hợp với chủ đề này.</span>;
                          }

                          return (
                            <select 
                              className="w-full bg-slate-950 border border-pink-500/30 text-pink-300 text-[10px] font-bold p-2.5 rounded-lg focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400/50 cursor-pointer appearance-none shadow-lg"
                              onChange={(e) => {
                                if (e.target.value) applySelectedStyle(e.target.value);
                                e.target.value = ""; 
                              }}
                              defaultValue=""
                            >
                              <option value="" disabled>✨ Click xổ chọn Style Cá nhân phù hợp...</option>
                              {recommendedStyles.length > 0 && (
                                <optgroup label="⭐ PHÙ HỢP & ĐẸP NHẤT (AI KHUYÊN DÙNG)" className="bg-pink-950/80 text-pink-300 font-black">
                                  {recommendedStyles.map((s, idx) => (
                                    <option key={`rec-${idx}`} value={s.aesthetic}>⭐ {s.aesthetic}</option>
                                  ))}
                                </optgroup>
                              )}
                              {suitableStyles.length > 0 && (
                                <optgroup label="✅ CÙNG NGÀNH NGHỀ (CÓ THỂ THỬ)" className="bg-slate-900 text-slate-300 font-semibold">
                                  {suitableStyles.map((s, idx) => (
                                    <option key={`suit-${idx}`} value={s.aesthetic}>• {s.aesthetic}</option>
                                  ))}
                                </optgroup>
                              )}
                            </select>
                          );
                        })()}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <button onClick={() => buildABPrompts(pipelineData, strictCloneMode, false, isSignboardMode)} className="w-full py-3 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 group mt-2">
              <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" /> CẬP NHẬT PROMPTS
            </button>
          </div>

          {/* CỘT KẾT QUẢ PROMPTS HOẶC CÔNG CỤ SỬA ẢNH (PHẢI) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {/* TABS CONTROLLER */}
            <div className="flex flex-wrap gap-2 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800">
              <button onClick={() => setActiveTab('prompt')} className={`flex-1 p-3 text-[10px] font-bold flex items-center justify-center gap-2 uppercase tracking-widest transition-colors rounded-lg whitespace-nowrap ${activeTab === 'prompt' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}><Box className="w-3 h-3" /> Text Prompts {strictCloneMode ? '' : '(A/B/C)'}</button>
              <button onClick={() => setActiveTab('edit')} className={`flex-1 p-3 text-[10px] font-bold flex items-center justify-center gap-2 uppercase tracking-widest transition-colors rounded-lg whitespace-nowrap ${activeTab === 'edit' ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(219,39,119,0.4)]' : 'text-slate-400 hover:bg-slate-800'}`}><ImagePlus className="w-3 h-3" /> Công Cụ Sửa Ảnh</button>
            </div>

            {/* NỘI DUNG TABS */}
            {activeTab === 'prompt' ? (
              <>
                <div className="flex gap-2 bg-slate-900/30 p-1.5 rounded-xl border border-slate-800">
                  {pipelineData.top3Styles && pipelineData.top3Styles.map((style, idx) => (
                    <button 
                      key={idx} onClick={() => setActiveVariant(idx)}
                      className={`flex-1 p-2 rounded-lg text-left transition-all relative overflow-hidden ${activeVariant === idx ? 'bg-slate-800 shadow-inner border border-slate-600' : 'bg-transparent border border-transparent hover:bg-slate-800/50'}`}
                    >
                      <span className={`block text-[9px] font-black uppercase tracking-widest mb-0.5 ${activeVariant === idx ? 'text-indigo-300' : 'text-slate-500'}`}>Variant {strictCloneMode ? 'Độc Bản' : ['A', 'B', 'C'][idx]}</span>
                      <span className={`block text-xs font-bold truncate ${activeVariant === idx ? 'text-white' : 'text-slate-300'}`}>{style.name}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 rounded-2xl border border-slate-700 flex flex-col h-full min-h-[350px] shadow-2xl relative overflow-hidden">
                  <div className="p-3 border-b border-slate-800 bg-slate-800/30 flex justify-between items-center z-10 relative">
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-500 text-white text-[10px] font-black px-2 py-0.5 rounded">VAR {strictCloneMode ? 'ĐỘC BẢN' : ['A', 'B', 'C'][activeVariant]}</span>
                    </div>
                  </div>
                  
                  {/* GIAO DIỆN NÚT COPY PROMPT MỚI, ẨN RAW TEXT */}
                  <div className="flex-grow flex flex-col items-center justify-center gap-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900 to-slate-950 p-8">
                    <div className="text-center space-y-4">
                      <div className="inline-flex p-4 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.15)] mb-2 relative">
                        <Sparkles className="w-12 h-12" />
                        <div className="absolute inset-0 bg-indigo-400/20 blur-xl rounded-full animate-pulse"></div>
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-wide">MASTER PROMPT ĐÃ SẴN SÀNG!</h3>
                      <p className="text-[13px] text-slate-400 max-w-md mx-auto leading-relaxed">
                        Toàn bộ 20+ hệ thống kỹ thuật cốt lõi (Art Direction, Đa dạng góc máy, Tâm lý thị giác, Chống lỗi AI...) đã được nén hoàn chỉnh.
                      </p>
                    </div>

                    <button 
                      onClick={() => handleCopy(generatedPrompts[activeVariant])} 
                      className={`px-10 py-5 rounded-2xl font-black text-[13px] flex items-center justify-center gap-3 transition-all active:scale-95 border-2 uppercase tracking-widest w-full max-w-sm ${
                        copyStatus 
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.5)]' 
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.5)]'
                      }`}
                    >
                      {copyStatus ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <Copy className="w-6 h-6 shrink-0" />}
                      <span>{copyStatus ? 'ĐÃ COPY THÀNH CÔNG' : 'COPY PROMPT ĐỂ CHẠY NGAY'}</span>
                    </button>
                    
                    <div className="text-[10px] text-emerald-400 font-medium uppercase tracking-widest flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity cursor-help" title="Lệnh Prompt này được bảo vệ trong bộ nhớ, nhấn nút trên để copy thẳng vào Clipboard.">
                       <Database className="w-3 h-3" /> System Engine V12.5 {isSignboardMode ? '(Signboard Mode)' : '(Premium Edition)'} Active
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // ==========================================
              // TAB 3: CÔNG CỤ SỬA ẢNH (EDIT TOOL)
              // ==========================================
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 h-full min-h-[500px]">
                
                {/* Edit Tool - Cột Trái (Nhập liệu) */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl flex flex-col shadow-xl overflow-hidden">
                  <div className="bg-slate-800/50 border-b border-slate-700 px-5 py-3 flex items-center gap-2">
                    <ImageIconUI className="w-4 h-4 text-pink-400" />
                    <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest">1. Ảnh Gốc & Yêu Cầu Sửa</h2>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col gap-4">
                    {/* Vùng Upload / Kéo thả ảnh */}
                    {editImagePreview ? (
                      <div className="flex flex-col gap-3">
                        <div className="relative w-full h-40 bg-slate-950/50 rounded-xl border border-slate-700 overflow-hidden flex items-center justify-center shadow-inner">
                          <img src={editImagePreview} alt="Preview" className="max-w-full max-h-full object-contain" />
                          <button 
                            onClick={handleRemoveEditImage}
                            className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-500 text-white rounded-full backdrop-blur-sm transition-all"
                            title="Xóa ảnh"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={handleAnalyzeEditImage}
                          disabled={isEditAnalyzing || isEditLoading}
                          className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-900/30 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-500/30 rounded-xl transition-all font-bold text-[11px] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                        >
                          {isEditAnalyzing ? (
                            <><Loader2 className="animate-spin h-4 w-4 text-indigo-400" /> Đang soi lỗi ảnh...</>
                          ) : (
                            <><Lightbulb className="w-4 h-4 text-amber-400" /> AI Phân Tích & Gợi Ý Lỗi Cần Sửa</>
                          )}
                        </button>
                      </div>
                    ) : (
                      <div 
                        onMouseEnter={() => handleZoneEnter('editTool')}
                        onMouseLeave={handleZoneLeave}
                        onClick={() => editFileInputRef.current?.click()}
                        onDragOver={handleEditDragOver}
                        onDragLeave={handleEditDragLeave}
                        onDrop={handleEditDrop}
                        className={`w-full border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 min-h-[160px] ${
                          isEditDragging || activeHover === 'editTool' ? 'bg-pink-900/20 border-pink-500/50' : 'border-slate-700 hover:bg-slate-800/50 hover:border-slate-500'
                        }`}
                      >
                        <input type="file" ref={editFileInputRef} className="hidden" accept="image/*" onChange={handleEditFileChange} />
                        <div className={`p-3 rounded-full mb-1 transition-colors ${isEditDragging || activeHover === 'editTool' ? 'bg-pink-950 text-pink-400' : 'bg-slate-800 text-slate-500'}`}>
                          <Upload className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                          {isEditDragging ? 'Thả ảnh vào đây' : 'Nhấn hoặc kéo thả ảnh cần sửa'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">Hoặc rê chuột vào ô này & ấn Ctrl+V</span>
                      </div>
                    )}

                    {/* Ô nhập Text sửa */}
                    <textarea
                      onMouseEnter={handleZoneLeave}
                      className="w-full flex-1 min-h-[100px] p-4 bg-slate-950/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-pink-500/50 outline-none transition-all resize-none text-sm text-slate-200 placeholder-slate-600 shadow-inner"
                      placeholder="Ví dụ: Thay background thành hoàng hôn, xóa đồ vật thừa, mở rộng khung hình..."
                      value={editInputText}
                      onChange={(e) => setEditInputText(e.target.value)}
                      disabled={isEditLoading}
                    />

                    {/* Gợi ý */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                        {editAiSuggestions.length > 0 ? "✨ AI Đã Bắt Mạch Xong (Click để sửa):" : "Mẹo sửa nhanh:"}
                      </span>
                      <div className={`flex flex-wrap gap-1.5 ${editAiSuggestions.length > 0 ? "max-h-40 overflow-y-auto pr-1" : ""}`}>
                        {(editAiSuggestions.length > 0 ? editAiSuggestions : exampleEditPrompts).map((ex, i) => (
                          <button
                            key={i}
                            onClick={() => setEditInputText(ex)}
                            className={`text-[10px] text-left bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 transition-colors border border-slate-700 ${
                              editAiSuggestions.length > 0 ? "rounded-lg w-full" : "rounded-full"
                            }`}
                            disabled={isEditLoading}
                          >
                            {editAiSuggestions.length > 0 ? <span className="font-bold mr-2 text-pink-400">{i + 1}.</span> : null}
                            {ex}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Nút Tạo Prompt Sửa */}
                    <button
                      onClick={handleGenerateEditPrompt}
                      disabled={isEditLoading || !editInputText.trim()}
                      className={`w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-md text-xs uppercase tracking-wider
                        ${isEditLoading || !editInputText.trim() 
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.3)] active:scale-[0.98]'
                        }`}
                    >
                      {isEditLoading ? (
                        <><Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" /> Đang thiết kế Lệnh...</>
                      ) : (
                        <><Wand2 className="w-4 h-4" /> Viết Prompt Sửa Ảnh Mức Agency</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Edit Tool - Cột Phải (Kết quả) */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl flex flex-col shadow-xl overflow-hidden">
                   <div className="bg-slate-800/50 border-b border-slate-700 px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-pink-400" />
                      <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest">2. Lệnh Inpaint Tiêu Chuẩn</h2>
                    </div>
                    
                    {editGeneratedPrompt && (
                      <button
                        onClick={handleCopyEditPrompt}
                        className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg shadow-sm hover:bg-slate-800 text-slate-300 transition-colors"
                      >
                        {editCopied ? (
                          <><CheckCircle2 className="w-3 h-3 text-emerald-400" /> <span className="text-emerald-400">Đã chép</span></>
                        ) : (
                          <><Copy className="w-3 h-3" /> <span>Sao chép</span></>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="p-5 flex-1 bg-slate-950/30">
                    {editGeneratedPrompt ? (
                      <div 
                        ref={editOutputRef}
                        className="w-full h-full p-5 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 font-mono text-[12px] leading-relaxed overflow-y-auto whitespace-pre-wrap shadow-inner selection:bg-pink-500/40"
                      >
                        {formatOutputText(editGeneratedPrompt)}
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 p-8 border-2 border-dashed border-slate-700/50 rounded-xl">
                        <Wand2 className="w-10 h-10 mb-3 text-slate-600 opacity-50" />
                        <p className="text-center text-xs">Prompt siêu chi tiết cho Midjourney/Imagen<br/>sẽ xuất hiện ở đây.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;