/* App entry point: wires data, components, and the directive together. */
const { createApp, ref, computed } = Vue;

const app = createApp({
  setup() {
    const categories = ['All', 'Packaging', 'Print'];
    const category = ref('All');
    const openProject = ref(null);

    const shownProjects = computed(() =>
      category.value === 'All' ? projects : projects.filter(p => p.type === category.value)
    );

    return { me, words, types, budgets, categories, category, openProject, shownProjects };
  }
});

app.component('ProjectCard', ProjectCard);
app.component('ProjectModal', ProjectModal);
app.component('ContactForm', ContactForm);
app.directive('reveal', revealDirective);

app.mount('#app');
