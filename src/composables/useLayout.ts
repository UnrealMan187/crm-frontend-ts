import { ref, onMounted } from 'vue';

const sidebarOpen = ref(false);

export function useLayout() {
  // Option: auf großen Screens standardmäßig offen
  onMounted(() => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      sidebarOpen.value = true;
    }
  });

  const openSidebar = () => (sidebarOpen.value = true);
  const closeSidebar = () => (sidebarOpen.value = false);
  const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value);

  return { sidebarOpen, openSidebar, closeSidebar, toggleSidebar };
}
