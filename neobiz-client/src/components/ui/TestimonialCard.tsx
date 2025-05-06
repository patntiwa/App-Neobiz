
export interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  companyName?: string;
  imageSrc: string;
  className?: string;
}

const TestimonialCard = ({ quote, author, role, companyName, imageSrc, className }: TestimonialCardProps) => {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-md ${className}`}>
      <div className="mb-4">
        <img
          src={imageSrc}
          alt={author}
          className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
        />
      </div>
      <blockquote className="text-text mb-4 text-center italic">
        "{quote}"
      </blockquote>
      <div className="text-center">
        <p className="font-semibold text-primary">{author}</p>
        <p className="text-sm text-text">
          {role} {companyName && `@ ${companyName}`}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
