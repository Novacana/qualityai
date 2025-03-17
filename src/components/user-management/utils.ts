
export const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    default:
      return "outline";
  }
};

export const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case "Admin":
      return "destructive";
    case "QMS Manager":
      return "default";
    case "Project Lead":
      return "info";
    case "Researcher":
      return "outline";
    case "Viewer":
      return "secondary";
    default:
      return "outline";
  }
};

export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};
