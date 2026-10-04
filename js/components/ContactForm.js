/* Client inquiry form. Builds an email (mailto) so no server is needed. */
const ContactForm = {
  props: {
    me: { type: Object, required: true },
    types: { type: Array, required: true },
    budgets: { type: Array, required: true }
  },
  setup(props) {
    const { ref } = Vue;
    const form = ref({
      name: '', email: '', phone: '', company: '',
      type: props.types[0], budget: props.budgets[0], deadline: '', details: ''
    });
    const errors = ref({});
    const status = ref('');

    function buildMessage() {
      const v = form.value;
      return [
        `Hi ${props.me.name},`,
        '',
        "I'd like to talk about a project.",
        '',
        `Name: ${v.name}`,
        `Email: ${v.email}`,
        `Phone: ${v.phone || '-'}`,
        `Company: ${v.company || '-'}`,
        `Need: ${v.type}`,
        `Budget: ${v.budget}`,
        `Deadline: ${v.deadline || '-'}`,
        '',
        'Project details:',
        v.details
      ].join('\n');
    }

    function validate() {
      const v = form.value, e = {};
      if (!v.name) e.name = 'Enter your name.';
      if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address.';
      if (v.details.length < 10) e.details = 'Add a few details about your project.';
      errors.value = e;
      const ok = Object.keys(e).length === 0;
      if (!ok) status.value = 'Fix the highlighted fields and try again.';
      return ok;
    }

    function send() {
      if (!validate()) return;
      const subject = encodeURIComponent(`Project inquiry: ${form.value.type} (${form.value.name})`);
      const body = encodeURIComponent(buildMessage());
      window.location.href = `mailto:${props.me.email}?subject=${subject}&body=${body}`;
      status.value = 'Your email app should open now. If it did not, use Copy message.';
    }

    async function copy() {
      if (!validate()) return;
      try {
        await navigator.clipboard.writeText(buildMessage());
        status.value = `Copied. Paste it into an email or chat to ${props.me.email}.`;
      } catch (err) {
        status.value = 'Copy was blocked. Select the details and copy them by hand.';
      }
    }

    return { form, errors, status, send, copy };
  },
  template: `
    <form class="inquiry" @submit.prevent="send" novalidate>
      <h3>Project inquiry</h3>
      <div class="row">
        <label>Your name
          <input v-model.trim="form.name" autocomplete="name" :class="{ bad: errors.name }">
          <span class="err" v-if="errors.name">{{ errors.name }}</span>
        </label>
        <label>Your email
          <input v-model.trim="form.email" type="email" autocomplete="email" :class="{ bad: errors.email }">
          <span class="err" v-if="errors.email">{{ errors.email }}</span>
        </label>
      </div>
      <div class="row">
        <label>Phone (optional)<input v-model.trim="form.phone" type="tel" autocomplete="tel"></label>
        <label>Company or brand (optional)<input v-model.trim="form.company"></label>
      </div>
      <div class="row">
        <label>What do you need?
          <select v-model="form.type"><option v-for="t in types" :key="t">{{ t }}</option></select>
        </label>
        <label>Budget
          <select v-model="form.budget"><option v-for="b in budgets" :key="b">{{ b }}</option></select>
        </label>
      </div>
      <label>Deadline (optional)<input v-model="form.deadline" type="date"></label>
      <label>Tell me about your project
        <textarea v-model.trim="form.details" rows="5" placeholder="What is the product? Who is it for? How many pieces?" :class="{ bad: errors.details }"></textarea>
        <span class="err" v-if="errors.details">{{ errors.details }}</span>
      </label>
      <div class="actions">
        <button class="btn" type="submit">Send by email</button>
        <button class="ghost" type="button" @click="copy">Copy message</button>
      </div>
      <p class="status" role="status" aria-live="polite">{{ status }}</p>
      <p class="note">This opens your email app with the message filled in. Nothing is stored on this page.</p>
    </form>`
};
