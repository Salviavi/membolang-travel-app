import { Facebook, Github, Instagram, X, Youtube } from "lucide-react";

export const FooterGuest = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-6">
              <span className="text-indigo-600 text-3xl font-bold">~</span>
            </div>
            <p className="text-gray-500 text-xs">
              © 2024 Your Company, Inc. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-2">Solutions</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Marketing</li>
              <li>Analytics</li>
              <li>Automation</li>
              <li>Commerce</li>
              <li>Insights</li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-2">Support</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Submit ticket</li>
              <li>Documentation</li>
              <li>Guides</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 font-semibold mb-2">Company</h3>
              <ul className="space-y-1 text-gray-600">
                <li>About</li>
                <li>Blog</li>
                <li>Jobs</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-2">Legal</h3>
              <ul className="space-y-1 text-gray-600">
                <li>Terms of service</li>
                <li>Privacy policy</li>
                <li>License</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 flex justify-center space-x-6 text-gray-500">
          <a href="#">
            <Facebook className="w-5 h-5 hover:text-indigo-600" />
          </a>
          <a href="#">
            <Instagram className="w-5 h-5 hover:text-indigo-600" />
          </a>
          <a href="#">
            <X className="w-5 h-5 hover:text-indigo-600" />
          </a>
          <a href="#">
            <Github className="w-5 h-5 hover:text-indigo-600" />
          </a>
          <a href="#">
            <Youtube className="w-5 h-5 hover:text-indigo-600" />
          </a>
        </div>
      </div>
    </footer>
  );
};
