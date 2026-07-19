#######################################################################
#                                                                     #
#                    TRANSLATION SCHEMAS                              #
#                                                                     #
#        Pydantic v2 models for translation request/response          #
#        - TranslateRequest                                           #
#        - TranslationItem                                            #
#        - TranslateResponse                                          #
#        - LanguageInfo / LanguagesResponse                           #
#                                                                     #
#######################################################################


from pydantic import BaseModel


class TranslateRequest(BaseModel):
    texts: list[str]                          # Array of texts to translate
    target: str = "en"                        # Target language code
    provider: str = "auto"                    # "auto", "mymemory", or "rapidapi"


class TranslationItem(BaseModel):
    original: str
    translated: str
    provider: str | None = None
    error: str | None = None


class TranslateResponse(BaseModel):
    translations: list[TranslationItem]
    provider: str = "unknown"
    count: int = 0


class LanguageInfo(BaseModel):
    code: str
    name: str
    nativeName: str
    flag: str


class LanguagesResponse(BaseModel):
    success: bool
    languages: list[LanguageInfo]
