import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

export function useLocale() {
  const { locale } = useI18n();

  const current = computed({
    get: () => locale.value,
    set: (val: string) => {
      locale.value = val;
      localStorage.setItem('locale', val);
    }
  });

  const options = [
    { value: 'de', label: 'DE' },
    { value: 'en', label: 'EN' }
  ];

  return { current, options };
}
