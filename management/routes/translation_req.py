#######################################################################
#                                                                     #
#                    TRANSLATION API                                  #
#                                                                     #
#        Google Translate via RapidAPI (primary)                      #
#        MyMemory Translate (fallback)                                #
#        - POST /          → Translate texts                          #
#        - GET  /languages → Supported languages list                 #
#        - GET  /test      → Smoke test                               #
#                                                                     #
#######################################################################


import asyncio
import os
import urllib.parse
from dotenv import load_dotenv
from fastapi import APIRouter
import httpx
from schemas.translation import (
    TranslateRequest,
    TranslateResponse,
    TranslationItem,
    LanguagesResponse,
    LanguageInfo,
)

load_dotenv()

router = APIRouter()


# ─── RapidAPI credentials (loaded from .env) ────────────────────────
RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY", "")
RAPIDAPI_HOST = os.getenv("RAPIDAPI_HOST", "free-google-translator.p.rapidapi.com")
RAPIDAPI_URL = os.getenv(
    "RAPIDAPI_URL",
    "https://free-google-translator.p.rapidapi.com/external-api/free-google-translator",
)


# ─── Supported Languages ────────────────────────────────────────────
SUPPORTED_LANGUAGES: list[dict] = [
    {"code": "en", "name": "English", "nativeName": "English", "flag": "🇺🇸"},
    {"code": "ht", "name": "Haitian Creole", "nativeName": "Kreyòl Ayisyen", "flag": "🇭🇹"},
    {"code": "es", "name": "Spanish", "nativeName": "Español", "flag": "🇪🇸"},
    {"code": "fr", "name": "French", "nativeName": "Français", "flag": "🇫🇷"},
    {"code": "de", "name": "German", "nativeName": "Deutsch", "flag": "🇩🇪"},
    {"code": "it", "name": "Italian", "nativeName": "Italiano", "flag": "🇮🇹"},
    {"code": "pt", "name": "Portuguese", "nativeName": "Português", "flag": "🇵🇹"},
    {"code": "pt-BR", "name": "Portuguese (Brazil)", "nativeName": "Português (Brasil)", "flag": "🇧🇷"},
    {"code": "ru", "name": "Russian", "nativeName": "Русский", "flag": "🇷🇺"},
    {"code": "zh-CN", "name": "Chinese (Simplified)", "nativeName": "简体中文", "flag": "🇨🇳"},
    {"code": "zh-TW", "name": "Chinese (Traditional)", "nativeName": "繁體中文", "flag": "🇹🇼"},
    {"code": "ja", "name": "Japanese", "nativeName": "日本語", "flag": "🇯🇵"},
    {"code": "ko", "name": "Korean", "nativeName": "한국어", "flag": "🇰🇷"},
    {"code": "ar", "name": "Arabic", "nativeName": "العربية", "flag": "🇸🇦"},
    {"code": "hi", "name": "Hindi", "nativeName": "हिन्दी", "flag": "🇮🇳"},
    {"code": "nl", "name": "Dutch", "nativeName": "Nederlands", "flag": "🇳🇱"},
    {"code": "pl", "name": "Polish", "nativeName": "Polski", "flag": "🇵🇱"},
    {"code": "tr", "name": "Turkish", "nativeName": "Türkçe", "flag": "🇹🇷"},
    {"code": "uk", "name": "Ukrainian", "nativeName": "Українська", "flag": "🇺🇦"},
    {"code": "sv", "name": "Swedish", "nativeName": "Svenska", "flag": "🇸🇪"},
    {"code": "vi", "name": "Vietnamese", "nativeName": "Tiếng Việt", "flag": "🇻🇳"},
    {"code": "th", "name": "Thai", "nativeName": "ภาษาไทย", "flag": "🇹🇭"},
    {"code": "id", "name": "Indonesian", "nativeName": "Bahasa Indonesia", "flag": "🇮🇩"},
    {"code": "sw", "name": "Swahili", "nativeName": "Kiswahili", "flag": "🇰🇪"},
    {"code": "am", "name": "Amharic", "nativeName": "አማርኛ", "flag": "🇪🇹"},
    {"code": "yo", "name": "Yoruba", "nativeName": "Yorùbá", "flag": "🇳🇬"},
    {"code": "ig", "name": "Igbo", "nativeName": "Igbo", "flag": "🇳🇬"},
    {"code": "ha", "name": "Hausa", "nativeName": "Hausa", "flag": "🇳🇬"},
    {"code": "zu", "name": "Zulu", "nativeName": "isiZulu", "flag": "🇿🇦"},
    {"code": "af", "name": "Afrikaans", "nativeName": "Afrikaans", "flag": "🇿🇦"},
    {"code": "so", "name": "Somali", "nativeName": "Soomaali", "flag": "🇸🇴"},
    {"code": "bn", "name": "Bengali", "nativeName": "বাংলা", "flag": "🇧🇩"},
    {"code": "ta", "name": "Tamil", "nativeName": "தமிழ்", "flag": "🇮🇳"},
    {"code": "te", "name": "Telugu", "nativeName": "తెలుగు", "flag": "🇮🇳"},
    {"code": "mr", "name": "Marathi", "nativeName": "मराठी", "flag": "🇮🇳"},
    {"code": "ur", "name": "Urdu", "nativeName": "اردو", "flag": "🇵🇰"},
    {"code": "fa", "name": "Persian", "nativeName": "فارسی", "flag": "🇮🇷"},
    {"code": "he", "name": "Hebrew", "nativeName": "עברית", "flag": "🇮🇱"},
    {"code": "el", "name": "Greek", "nativeName": "Ελληνικά", "flag": "🇬🇷"},
    {"code": "cs", "name": "Czech", "nativeName": "Čeština", "flag": "🇨🇿"},
    {"code": "sk", "name": "Slovak", "nativeName": "Slovenčina", "flag": "🇸🇰"},
    {"code": "hu", "name": "Hungarian", "nativeName": "Magyar", "flag": "🇭🇺"},
    {"code": "ro", "name": "Romanian", "nativeName": "Română", "flag": "🇷🇴"},
    {"code": "bg", "name": "Bulgarian", "nativeName": "Български", "flag": "🇧🇬"},
    {"code": "hr", "name": "Croatian", "nativeName": "Hrvatski", "flag": "🇭🇷"},
    {"code": "sr", "name": "Serbian", "nativeName": "Српски", "flag": "🇷🇸"},
    {"code": "sl", "name": "Slovenian", "nativeName": "Slovenščina", "flag": "🇸🇮"},
    {"code": "lt", "name": "Lithuanian", "nativeName": "Lietuvių", "flag": "🇱🇹"},
    {"code": "lv", "name": "Latvian", "nativeName": "Latviešu", "flag": "🇱🇻"},
    {"code": "et", "name": "Estonian", "nativeName": "Eesti", "flag": "🇪🇪"},
    {"code": "fi", "name": "Finnish", "nativeName": "Suomi", "flag": "🇫🇮"},
    {"code": "da", "name": "Danish", "nativeName": "Dansk", "flag": "🇩🇰"},
    {"code": "no", "name": "Norwegian", "nativeName": "Norsk", "flag": "🇳🇴"},
    {"code": "is", "name": "Icelandic", "nativeName": "Íslenska", "flag": "🇮🇸"},
    {"code": "ga", "name": "Irish", "nativeName": "Gaeilge", "flag": "🇮🇪"},
    {"code": "cy", "name": "Welsh", "nativeName": "Cymraeg", "flag": "🏴\U000e0067\U000e0062\U000e0077\U000e006c\U000e0073\U000e007f"},
    {"code": "ca", "name": "Catalan", "nativeName": "Català", "flag": "🇪🇸"},
    {"code": "eu", "name": "Basque", "nativeName": "Euskara", "flag": "🇪🇸"},
    {"code": "gl", "name": "Galician", "nativeName": "Galego", "flag": "🇪🇸"},
    {"code": "mt", "name": "Maltese", "nativeName": "Malti", "flag": "🇲🇹"},
    {"code": "ms", "name": "Malay", "nativeName": "Bahasa Melayu", "flag": "🇲🇾"},
    {"code": "tl", "name": "Filipino", "nativeName": "Filipino", "flag": "🇵🇭"},
    {"code": "ceb", "name": "Cebuano", "nativeName": "Cebuano", "flag": "🇵🇭"},
    {"code": "jw", "name": "Javanese", "nativeName": "Basa Jawa", "flag": "🇮🇩"},
    {"code": "su", "name": "Sundanese", "nativeName": "Basa Sunda", "flag": "🇮🇩"},
    {"code": "my", "name": "Myanmar (Burmese)", "nativeName": "မြန်မာ", "flag": "🇲🇲"},
    {"code": "km", "name": "Khmer", "nativeName": "ខ្មែរ", "flag": "🇰🇭"},
    {"code": "lo", "name": "Lao", "nativeName": "ລາວ", "flag": "🇱🇦"},
    {"code": "ka", "name": "Georgian", "nativeName": "ქართული", "flag": "🇬🇪"},
    {"code": "hy", "name": "Armenian", "nativeName": "Հայերեն", "flag": "🇦🇲"},
    {"code": "az", "name": "Azerbaijani", "nativeName": "Azərbaycan", "flag": "🇦🇿"},
    {"code": "uz", "name": "Uzbek", "nativeName": "Oʻzbek", "flag": "🇺🇿"},
    {"code": "kk", "name": "Kazakh", "nativeName": "Қазақ", "flag": "🇰🇿"},
    {"code": "ky", "name": "Kyrgyz", "nativeName": "Кыргызча", "flag": "🇰🇬"},
    {"code": "tg", "name": "Tajik", "nativeName": "Тоҷикӣ", "flag": "🇹🇯"},
    {"code": "tk", "name": "Turkmen", "nativeName": "Türkmen", "flag": "🇹🇲"},
    {"code": "mn", "name": "Mongolian", "nativeName": "Монгол", "flag": "🇲🇳"},
    {"code": "ne", "name": "Nepali", "nativeName": "नेपाली", "flag": "🇳🇵"},
    {"code": "si", "name": "Sinhala", "nativeName": "සිංහල", "flag": "🇱🇰"},
    {"code": "ml", "name": "Malayalam", "nativeName": "മലയാളം", "flag": "🇮🇳"},
    {"code": "kn", "name": "Kannada", "nativeName": "ಕನ್ನಡ", "flag": "🇮🇳"},
    {"code": "gu", "name": "Gujarati", "nativeName": "ગુજરાતી", "flag": "🇮🇳"},
    {"code": "pa", "name": "Punjabi", "nativeName": "ਪੰਜਾਬੀ", "flag": "🇮🇳"},
    {"code": "sd", "name": "Sindhi", "nativeName": "سنڌي", "flag": "🇵🇰"},
    {"code": "ps", "name": "Pashto", "nativeName": "پښتو", "flag": "🇦🇫"},
    {"code": "ku", "name": "Kurdish", "nativeName": "Kurdî", "flag": "🇮🇶"},
    {"code": "yi", "name": "Yiddish", "nativeName": "ייִדיש", "flag": "🇮🇱"},
    {"code": "eo", "name": "Esperanto", "nativeName": "Esperanto", "flag": "🌍"},
    {"code": "la", "name": "Latin", "nativeName": "Latina", "flag": "🇻🇦"},
    {"code": "haw", "name": "Hawaiian", "nativeName": "ʻŌlelo Hawaiʻi", "flag": "🇺🇸"},
    {"code": "mi", "name": "Maori", "nativeName": "Te Reo Māori", "flag": "🇳🇿"},
    {"code": "sm", "name": "Samoan", "nativeName": "Gagana Samoa", "flag": "🇼🇸"},
    {"code": "mg", "name": "Malagasy", "nativeName": "Malagasy", "flag": "🇲🇬"},
    {"code": "ny", "name": "Chichewa", "nativeName": "Chichewa", "flag": "🇲🇼"},
    {"code": "sn", "name": "Shona", "nativeName": "chiShona", "flag": "🇿🇼"},
    {"code": "xh", "name": "Xhosa", "nativeName": "isiXhosa", "flag": "🇿🇦"},
    {"code": "st", "name": "Sesotho", "nativeName": "Sesotho", "flag": "🇱🇸"},
    {"code": "rw", "name": "Kinyarwanda", "nativeName": "Kinyarwanda", "flag": "🇷🇼"},
    {"code": "lg", "name": "Luganda", "nativeName": "Luganda", "flag": "🇺🇬"},
    {"code": "ak", "name": "Akan", "nativeName": "Akan", "flag": "🇬🇭"},
    {"code": "ee", "name": "Ewe", "nativeName": "Eʋegbe", "flag": "🇬🇭"},
    {"code": "tw", "name": "Twi", "nativeName": "Twi", "flag": "🇬🇭"},
    {"code": "ti", "name": "Tigrinya", "nativeName": "ትግርኛ", "flag": "🇪🇷"},
    {"code": "om", "name": "Oromo", "nativeName": "Oromoo", "flag": "🇪🇹"},
    {"code": "be", "name": "Belarusian", "nativeName": "Беларуская", "flag": "🇧🇾"},
    {"code": "mk", "name": "Macedonian", "nativeName": "Македонски", "flag": "🇲🇰"},
    {"code": "sq", "name": "Albanian", "nativeName": "Shqip", "flag": "🇦🇱"},
    {"code": "bs", "name": "Bosnian", "nativeName": "Bosanski", "flag": "🇧🇦"},
    {"code": "lb", "name": "Luxembourgish", "nativeName": "Lëtzebuergesch", "flag": "🇱🇺"},
    {"code": "fy", "name": "Frisian", "nativeName": "Frysk", "flag": "🇳🇱"},
    {"code": "gd", "name": "Scots Gaelic", "nativeName": "Gàidhlig", "flag": "🏴\U000e0067\U000e0062\U000e0073\U000e0063\U000e0074\U000e007f"},
    {"code": "co", "name": "Corsican", "nativeName": "Corsu", "flag": "🇫🇷"},
]


# ─── Provider: RapidAPI Free Google Translator ──────────────────────
async def _translate_rapidapi(
    texts: list[str],
    target: str,
    source: str = "en",
) -> list[TranslationItem]:
    """
    Translate a list of texts using the free Google Translator via
    RapidAPI. Texts are sent in parallel batches of 10 with a 50 ms
    pause between batches.
    """
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
        "Content-Type": "application/json",
    }

    results: list[TranslationItem] = [None] * len(texts)  # type: ignore[list-item]

    async def _single(index: int, text: str) -> None:
        params = {
            "from": source,
            "to": target,
            "query": text,
        }
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(
                RAPIDAPI_URL,
                headers=headers,
                params=params,
                json={"translate": "rapidapi"},
            )
            resp.raise_for_status()
            data = resp.json()

            # The API returns the translated text directly as a JSON string
            translated = data if isinstance(data, str) else str(data)
            results[index] = TranslationItem(
                original=text,
                translated=translated,
                provider="rapidapi",
            )

    # Process in batches of 10
    batch_size = 10
    for batch_start in range(0, len(texts), batch_size):
        batch_end = min(batch_start + batch_size, len(texts))
        tasks = [
            _single(i, texts[i])
            for i in range(batch_start, batch_end)
        ]
        await asyncio.gather(*tasks)
        # 50 ms pause between batches to avoid rate limiting
        if batch_end < len(texts):
            await asyncio.sleep(0.05)

    return results


# ─── Provider: MyMemory Translate (Fallback) ────────────────────────
async def _translate_mymemory(
    texts: list[str],
    target: str,
    source: str = "en",
) -> list[TranslationItem]:
    """
    Translate texts sequentially using the MyMemory API.
    300 ms delay between requests to respect rate limits.
    """
    results: list[TranslationItem] = []

    async with httpx.AsyncClient(timeout=30.0) as client:
        for i, text in enumerate(texts):
            try:
                if source.lower() == target.lower():
                    results.append(
                        TranslationItem(
                            original=text,
                            translated=text,
                            provider="mymemory",
                        )
                    )
                    continue

                params = {
                    "q": text,
                    "langpair": f"{source}|{target}",
                    "mt": "1",
                }
                resp = await client.get(
                    "https://api.mymemory.translated.net/get",
                    params=params,
                )
                resp.raise_for_status()
                data = resp.json()

                translated_text = (
                    data.get("responseData", {}).get("translatedText", text)
                )
                results.append(
                    TranslationItem(
                        original=text,
                        translated=translated_text,
                        provider="mymemory",
                    )
                )
            except Exception as exc:
                results.append(
                    TranslationItem(
                        original=text,
                        translated=text,
                        provider="mymemory",
                        error=str(exc),
                    )
                )

            # 300 ms rate-limit delay (skip after last item)
            if i < len(texts) - 1:
                await asyncio.sleep(0.3)

    return results


# ─── Main translation function with fallback ────────────────────────
async def _translate(
    texts: list[str],
    target: str,
    provider: str = "auto",
) -> TranslateResponse:
    """
    Top-level translation dispatcher.
    - provider="rapidapi" → only RapidAPI
    - provider="mymemory" → only MyMemory
    - provider="auto"     → try RapidAPI, fall back to MyMemory
    Always returns HTTP 200 with error details instead of raising.
    """
    used_provider = provider

    # Force a specific provider
    if provider == "rapidapi":
        try:
            items = await _translate_rapidapi(texts, target)
            return TranslateResponse(
                translations=items,
                provider="rapidapi",
                count=len(items),
            )
        except Exception as exc:
            # Return originals with error info
            items = [
                TranslationItem(
                    original=t, translated=t, provider="rapidapi", error=str(exc)
                )
                for t in texts
            ]
            return TranslateResponse(
                translations=items,
                provider="rapidapi",
                count=len(items),
            )

    if provider == "mymemory":
        items = await _translate_mymemory(texts, target)
        return TranslateResponse(
            translations=items,
            provider="mymemory",
            count=len(items),
        )

    # ── Auto mode: RapidAPI first, MyMemory fallback ──
    try:
        items = await _translate_rapidapi(texts, target)
        return TranslateResponse(
            translations=items,
            provider="rapidapi",
            count=len(items),
        )
    except Exception:
        pass  # fall through to MyMemory

    try:
        items = await _translate_mymemory(texts, target)
        return TranslateResponse(
            translations=items,
            provider="mymemory",
            count=len(items),
        )
    except Exception as exc:
        # Both providers failed — return originals with error
        items = [
            TranslationItem(
                original=t,
                translated=t,
                provider=None,
                error=f"All providers failed: {exc}",
            )
            for t in texts
        ]
        return TranslateResponse(
            translations=items,
            provider="none",
            count=len(items),
        )


# =====================================================================
#                           ENDPOINTS
# =====================================================================


@router.post("/", response_model=TranslateResponse)
async def translate_texts(request: TranslateRequest):
    """
    Translate an array of texts to the target language.
    Supports forcing a specific provider via the `provider` field.
    """
    return await _translate(
        texts=request.texts,
        target=request.target,
        provider=request.provider,
    )


@router.get("/languages", response_model=LanguagesResponse)
async def get_supported_languages():
    """Return the full list of supported translation languages."""
    languages = [LanguageInfo(**lang) for lang in SUPPORTED_LANGUAGES]
    return LanguagesResponse(success=True, languages=languages)


@router.get("/test", response_model=TranslateResponse)
async def smoke_test():
    """
    Quick smoke test: translates three sample phrases to Spanish.
    Validates that the translation providers are working.
    """
    return await _translate(
        texts=["Hello world", "How are you?", "Thank you"],
        target="es",
        provider="auto",
    )
