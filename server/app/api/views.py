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


class StreamList(generics.ListAPIView):
    serializer_class = StreamSerializer
    filter_backends = (filters.SearchFilter,)
    http_method_names = ("get",)

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers"""
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the recipes for the authenticated user"""
        stream_ids = self.request.query_params.get('stream')
        users_ids = self.request.query_params.get('user')
        categories_ids = self.request.query_params.get('category')
        queryset = self.queryset
        if users_ids:
            _ = self._params_to_ints(users_ids)
            queryset = queryset.filter(tags__id__in=_)
        if categories_ids:
            _ = self._params_to_ints(categories_ids)
            queryset = queryset.filter(ingredients__id__in=_)
        if stream_ids:
            _ = self._params_to_ints(stream_ids)
            queryset = queryset.filter(ingredients__id__in=_)




class ManageStreamView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    serializer_class = StreamSerializer

    def get_object(self):
        user_stream = Stream.objects.filter(user=self.request.user)[0]

        return user_stream


