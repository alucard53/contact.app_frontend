// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
    interface Contact {
      firstName: String,
      lastName: String,
      phone: Number,
      email: String,
    }
  }
}

export { };
