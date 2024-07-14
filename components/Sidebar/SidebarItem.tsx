interface Props {
  icon: React.ReactNode;
  text: string;
  href: string;
  isOpen: boolean;
}

const SidebarItem = ({ icon, text, href, isOpen }: Props) => (
  <a
    href={href}
    className={`flex items-center space-x-4 w-full px-6 py-4 rounded-xl hover:bg-purple-500 hover:text-white ${
      !isOpen && "justify-center"
    }`}
  >
    {icon}
    {isOpen && <span className="text-lg">{text}</span>}
  </a>
);

export default SidebarItem;
