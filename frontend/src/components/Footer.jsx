const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Job Portal</h2>
            <p className="text-sm">© 2024 JobPortal. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              className="hover:text-gray-400"
              aria-label="Facebook"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.676 0H1.324C.592 0 0 .593 0 1.324v21.352C0 23.407.592 24 1.324 24h11.497v-9.294H9.689v-3.622h3.132V8.413c0-3.1 1.892-4.788 4.657-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.324-.593 1.324-1.324V1.324C24 .593 23.408 0 22.676 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-gray-400"
              aria-label="Twitter"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.828 9.828 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3.1a9.865 9.865 0 0 1-3.127 1.194 4.917 4.917 0 0 0-8.384 4.482 13.946 13.946 0 0 1-10.125-5.138 4.916 4.916 0 0 0 1.523 6.573A4.903 4.903 0 0 1 .96 8.868v.062a4.917 4.917 0 0 0 3.946 4.827 4.936 4.936 0 0 1-2.212.084 4.919 4.919 0 0 0 4.6 3.417 9.868 9.868 0 0 1-6.102 2.102c-.396 0-.786-.023-1.17-.067a13.945 13.945 0 0 0 7.548 2.211c9.057 0 14.01-7.513 14.01-14.01 0-.213-.005-.426-.014-.637A10.012 10.012 0 0 0 24 4.557z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-gray-400"
              aria-label="LinkedIn"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.615c0-1.338-.024-3.063-1.868-3.063-1.868 0-2.154 1.46-2.154 2.963v5.715H9.317V9h3.414v1.561h.05c.476-.9 1.637-1.848 3.37-1.848 3.6 0 4.267 2.368 4.267 5.452v6.287zM5.337 7.433a2.067 2.067 0 1 1 0-4.133 2.067 2.067 0 0 1 0 4.133zM6.887 20.452H3.782V9h3.105v11.452zM22.225 0H1.771C.792 0 0 .77 0 1.72v20.507C0 23.23.792 24 1.771 24h20.454c.979 0 1.771-.77 1.771-1.72V1.72C24 .77 23.204 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
