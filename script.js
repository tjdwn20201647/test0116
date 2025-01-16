class TextToSpeech {
    constructor() {
        this.synthesis = window.speechSynthesis;
        this.voices = [];
        
        // DOM 요소
        this.textInput = document.getElementById('textInput');
        this.speakButton = document.getElementById('speakButton');
        
        // 이벤트 리스너
        this.speakButton.addEventListener('click', () => this.speak());
        
        // 음성 로드
        this.loadVoices();
        this.synthesis.addEventListener('voiceschanged', () => this.loadVoices());
    }

    loadVoices() {
        this.voices = this.synthesis.getVoices();
        // en-US 음성 찾기 (여성 음성 우선)
        this.selectedVoice = this.voices.find(voice => 
            voice.lang === 'en-US' && voice.name.includes('Female')
        ) || this.voices.find(voice => 
            voice.lang === 'en-US'
        ) || this.voices[0];
    }

    speak() {
        if (this.synthesis.speaking) {
            this.synthesis.cancel();
        }

        const text = this.textInput.value.trim();
        if (!text) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.selectedVoice;
        utterance.rate = 1.0;  // 고정 속도
        utterance.pitch = 1.0; // 고정 음높이

        utterance.onstart = () => {
            this.speakButton.disabled = true;
        };

        utterance.onend = () => {
            this.speakButton.disabled = false;
        };

        utterance.onerror = () => {
            this.speakButton.disabled = false;
        };

        this.synthesis.speak(utterance);
    }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    new TextToSpeech();
});