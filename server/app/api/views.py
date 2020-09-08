from rest_framework import generics, authentication, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework import filters

from .serializers import UserSerializer, AuthTokenSerializer, StreamSerializer
from core.models import Stream

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve ONLY authenticated user, not them all"""
        return self.request.user


class StreamView(generics.ListAPIView):
    serializer_class = StreamSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('=id', 'category',)
    queryset = Stream.objects.all()


