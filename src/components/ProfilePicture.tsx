import styled from "styled-components";
import { memo } from "react";

// Outer circle frame
const CircleFrame = styled.div`
  display: inline-block;
  border-radius: 50%;
  width: 17.5rem;
  height: 17.5rem;
  background: ${({ theme }) => theme.component.background};
  border: 0.1rem solid ${({ theme }) => theme.name === 'dark' ? 'white' : 'black'};
  margin-top: 1.875rem; /* 30px forehead space */
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

// Inner image, slightly larger and shifted up
const CircleImage = styled.div<{ $image: string }>`
  display: inline-block;
  width: 17.5rem;
  height: 21.25rem;
  margin-top: -3.75rem;
  background: url(${(props) => props.$image}) no-repeat center bottom / 21.25rem;
  border-radius: 0 0 8.75rem 8.75rem;
`;

interface ProfilePictureProps {
  src: string;
  alt?: string;
}

const ProfilePicture = memo(({ src, alt }: ProfilePictureProps) => {
  return (
    <CircleFrame>
      <CircleImage $image={src} role="img" aria-label={alt} />
    </CircleFrame>
  );
});

ProfilePicture.displayName = 'ProfilePicture';

export default ProfilePicture;