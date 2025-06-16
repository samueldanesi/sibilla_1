import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-section">
        {/* Logo */}
        <div className="text-4xl font-bold tracking-wider text-brand-black">
          SIBILLA
        </div>

        {/* 404 Number */}
        <div className="text-8xl md:text-9xl font-light text-brand-black/20">
          404
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-medium text-brand-black">
            Page Not Found
          </h1>
          <p className="text-lg text-brand-black/70 leading-relaxed">
            Looks like this page went missing. Perhaps it's time for a cocktail
            instead?
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 sibilla-button-primary text-lg px-8 py-4"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 sibilla-button-secondary text-lg px-8 py-4 ml-4"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Quote */}
        <blockquote className="text-sm italic text-brand-black/60 mt-12">
          "Every wrong turn can lead to a beautiful discovery."
        </blockquote>
      </div>
    </div>
  );
};

export default NotFound;
