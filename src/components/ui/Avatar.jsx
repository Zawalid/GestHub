import { useUser } from '@/hooks/useUser';
import { forwardRef } from 'react';

const getFallback = (role, gender) => {
  if (['user', 'intern'].includes(role)) return gender === 'M' ? '/images/male.png' : '/images/female.png';
  if (['super-admin', 'admin', 'supervisor'].includes(role))
    return gender === 'M' ? '/images/male-admin.png' : '/images/female-admin.png';
};

/**
 * Avatar component.
 *
 * @component
 *
 * @param {string} [props.className='h-9 w-9'] - The CSS classes to apply to the Avatar.
 * @param {Object} [props.custom] - Custom properties to override the user properties.
 * @param {string} [props.custom.role] - The role of the user. This can be 'user', 'intern', 'super-admin', 'admin', or 'supervisor'.
 * @param {string} [props.custom.gender] - The gender of the user. This can be 'M' or 'Mme'.
 * @param {Object} [props.custom.avatar] - The avatar of the user.
 *
 * @returns {React.ElementType} Returns an img element with the Avatar.
 */
const Avatar = forwardRef(({ className = 'h-9 w-9', custom, ...props }, ref) => {
  const { user } = useUser();

  const { role: userRole, gender: userGender, avatar: { src: userAvatar } = {} } = user || {};
  const { role: customRole, gender: customGender, avatar: customAvatar } = custom || {};

  const role = (custom && (customRole || 'intern')) || userRole;
  const gender = customGender || userGender || 'M';
  const avatar = customAvatar || userAvatar;

  return (
    <img
      ref={ref}
      className={`rounded-full border border-border object-cover text-center text-xs text-text-tertiary ${className}`}
      src={avatar || getFallback(role, gender)}
      alt='profile image'
      {...props}
    />
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
