'use client';

interface HeadingProps {
    title: string;
    subtitle?: string;
}
const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
}) => {
    return ( 
        <div className="mb-8 flex flex-col gap-0">
          <h1 className="font-semibold text-lg md:text-2xl">
            {title}
          </h1>
          <p className="font-light text-slate-400">
            {subtitle}
          </p>
      </div>
     );
}
 
export default Heading;